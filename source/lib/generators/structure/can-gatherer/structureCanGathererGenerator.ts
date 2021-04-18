import {
    ConfigModel,
    isStructureValue,
    isStructureValueDefinition,
    StructureMessage,
    StructureMessagesGroup,
    StructureModel,
    StructureNetwork,
    StructureValue,
    StructureValueDefinition
} from '../../../types';
import { StructureGenerator } from '../structureGenerator';

interface LocalScope {
    tempVars: Set<string>;
    messageVals: Set<string>;
}

/**
 * The StructureCanGathererGenerator class, extending the [[StructureGenerator]] class and generating the code that allocates a data structure.
 */
export abstract class StructureCanGathererGenerator extends StructureGenerator {
    /** The canbus network that the messages belong to */
    protected abstract network: StructureNetwork;

    /**
     * The constructor of the StructureCanGathererGenerator class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

    /**
     * Parses an expression.
     * @param localScope The local scope with the defined vars.
     * @param value The value that contains the expression.
     * @param valueKey If the expression comes from a composite message value, $value will be an alias for #valueKey
     * @returns The parsed expression.
     */
    private parseExpression(localScope: LocalScope, value: string, valueKey?: string): string {
        const tempVarsRegExp = /\($[a-zA-Z_][a-zA-Z0-9_]*)/g;
        const messageValsRegExp = /(#[a-zA-Z_][a-zA-Z0-9_]*)/g;

        const tempVars: string[] = (tempVarsRegExp.exec(value) ?? []).map((match: string) => `${match.slice(1)}`);
        const messageVals: string[] = (messageValsRegExp.exec(value) ?? []).map((match: string) => match.slice(1));

        let parsedExpression = value;

        new Set(tempVars).forEach(tempVar => {
            if (valueKey && tempVar === 'value') {
                messageVals.push(valueKey);
            } else if (!localScope.tempVars.has(tempVar)) {
                throw new Error(`StructureCanGathererGeneratorGenerator Error, unknown reference to var ${tempVar}`);
            } else {
                parsedExpression = parsedExpression.replace(new RegExp(`\$${tempVar}`, 'g'), tempVar);
            }
        });
        new Set(messageVals).forEach(messageVal => {
            parsedExpression = parsedExpression.replace(new RegExp(`#${messageVal}`, 'g'), `message->${messageVal}`);
        });

        return parsedExpression;
    }

    /**
     * Given a scope and a value, generates the code that parses that message value.
     * @param localScope The local scope with the defined vars.
     * @param definition The definition of the message value, containing its type and its expression.
     * @param name If it comes from a composite message value, its key.
     */
    private parseValue(localScope: LocalScope, definition: StructureValue, name?: string): void {
        const subKey = name ? `.${name}` : '';
        const handledDefinition: StructureValueDefinition = isStructureValueDefinition(definition)
            ? definition
            : { type: definition, value: '$value' };
        const parsedExpression = this.parseExpression(localScope, handledDefinition.value, name);
        this.print(`${this.propName}[count].value${subKey} = ${parsedExpression};`);
    }

    /**
     * Given a scope and a temp var definition, checks if the temp var is ok and adds it to the local scope.
     * @param localScope The local scope with the defined vars.
     * @param name The name of the temp var.
     * @param definition The definition of the var, containing its type and its expression.
     */
    private parseTempVar(localScope: LocalScope, name: string, definition: StructureValueDefinition): void {
        if (name in localScope.tempVars) {
            throw new Error(`StructureCanGathererGeneratorGenerator Error, $${name} already exists`);
        }
        this.print(`${definition.type} _${name} = ${this.parseExpression(localScope, definition.value)}`);
        localScope.tempVars.add(name);
    }

    /**
     * Generates the code that gathers from the can a certain message.
     * @param message The message whose code will be generated.
     */
    private parseMessage(message: StructureMessage): void {
        const messageName = message.name as string;
        const messageId = `ID_${messageName}`;
        const nakedMessageName = `Primary_${messageName}`;

        const localScope: LocalScope = { tempVars: new Set(), messageVals: new Set() };

        const defines = message.defines;
        if (defines) {
            Object.keys(defines).forEach(key => this.parseTempVar(localScope, key, defines[key]));
        }

        const value = message.value;
        if (isStructureValue(value)) {
            this.parseValue(localScope, value);
        } else {
            Object.keys(value).forEach(key => this.parseValue(localScope, value[key], key));
        }

        this.print(`case (${messageId}):`);
        this.indentation++;

        this.print(`int count = ${this.propCountName}`);
        this.print(`if (count < ${this.propSizeName}) {`);
        this.indentation++;

        this.print(`${nakedMessageName}* message = (${nakedMessageName}*) malloc(sizeof(${nakedMessageName}));`);
        this.print(`deserialize_${nakedMessageName}(data, 8, message);`);
        this.print(`${this.propName}[count].timestamp = getCurrentTimestamp();`);

        this.indentation--;
        this.print('}');
        this.print('break;');

        this.indentation--;
    }

    /**
     * Given the structure model generates the code that gather the data from the can.
     * @param data The structure model or one of its nested property values.
     */
    private parse(data: StructureMessagesGroup): void {
        for (const key in data) {
            const child = data[key];
            this.keys.push(key);
            if (Array.isArray(child)) {
                const message = child[0];
                if (message.network === this.network) {
                    this.parseMessage(message);
                }
            } else if (typeof child === 'object') {
                this.parse(child);
            }
            this.keys.pop();
        }
    }

    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.structure);
    }
}
