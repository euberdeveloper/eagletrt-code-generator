import {
    ConfigModel,
    Generator,
    isStructureValue,
    isStructureValuePrimitive,
    StructureMessage,
    StructureMessagesGroup,
    StructureModel,
    StructureValue,
    StructureValuePrimitive
} from '../../types';

/**
 * The StructureGenerator class, extending the Generator class and giving a blueprint for all the generators regarding the data structure.
 */
export abstract class StructureGenerator extends Generator {
    /**
     * A stack of inspected keys.
     */
    protected keys: string[] = [];

    /**
     * The current indentation as number of tabs.
     */
    protected indentation = 0;

    /**
     * The parsed structure, with all the [[StructureValueDefinition]] values transformed into a [[StructureValuePrimitive]].
     */
    protected get parsedStructure(): StructureModel {
        return this.parseStructure(this.structure) as StructureModel;
    }

    /**
     * The strings of indentation tabs, dependent by the indentation field.
     */
    protected get indentationTabs(): string {
        return Array(this.indentation).fill('\t').join('');
    }

    /**
     * Given the current inspected keys, returns the name of the associated struct.
     */
    protected get structName(): string {
        return `${this.keys.join('_')}_data`;
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property.
     */
    protected get propName(): string {
        return this.keys.reduce((accumulator, current) => accumulator + `.${current}`, '').replace('.', '->');
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _count at the end and keeping only the last key.
     */
    protected get countName(): string {
        const last = this.keys.length - 1;
        return `${this.keys[last]}_count`;
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _size at the end and keeping only the last key.
     */
    protected get sizeName(): string {
        const last = this.keys.length - 1;
        return `${this.keys[last]}_size`;
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _count at the end.
     */
    protected get propCountName(): string {
        const last = this.keys.length - 1;
        return `${this.keys.slice(0, last).reduce((accumulator, current) => (accumulator += `.${current}`), '')}.${
            this.countName
        }`.replace('.', '->');
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _size at the end.
     */
    protected get propSizeName(): string {
        const last = this.keys.length - 1;
        return `${this.keys.slice(0, last).reduce((accumulator, current) => (accumulator += `.${current}`), '')}.${
            this.sizeName
        }`.replace('.', '->');
    }

    /**
     * The constructor of the [[StructureGenerator]] class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
    }

    /**
     * Prints the given string to the current cursor, formatting it.
     * @param str The string to print.
     */
    protected print(str: string): void {
        this.code += `${this.indentationTabs}${str}\n`;
    }

    /**
     * Parses the given [[StructureValue]], transforming an eventual [[StructureValueDefinition]] into a [[StructureValuePrimitive]].
     * @param value The [[StructureValue]] to parse.
     * @returns The parsed [[StructureValuePrimitive]]
     */
    private parseStructureValue(value: StructureValue): StructureValuePrimitive {
        return isStructureValuePrimitive(value) ? value : value.type;
    }

    /**
     * Parses the given [StructureMessage], trasforming all the eventual [[StructureValueDefinition]] into a [[StructureValuePrimitive]].
     * @param message The structure message to parse.
     * @returns The resulted structure message.
     */
    private parseStructureMessage(message: StructureMessage): StructureMessage {
        return {
            ...message,
            value: isStructureValue(message.value)
                ? this.parseStructureValue(message.value)
                : Object.keys(message.value).reduce(
                      (result, key) => ({ ...result, [key]: this.parseStructureValue(message.value[key]) }),
                      {}
                  )
        };
    }

    /**
     * Parses the given [[StructureModel]] or [[StructureMessagesGroup]], transoforming all the eventual [[StructureValueDefinition]] into a [[StructureValuePrimitive]].
     * @param structure The structure model or group to parse.
     * @returns The parsed result.
     */
    private parseStructure(
        structure: StructureModel | StructureMessagesGroup
    ): StructureModel | StructureMessagesGroup {
        return Object.keys(structure).reduce((result, key) => {
            const value = structure[key];

            if (Array.isArray(value)) {
                result[key] = [this.parseStructureMessage(value[0])];
            } else if (typeof value === 'object') {
                result[key] = this.parseStructure(value);
            } else {
                result[key] = value;
            }
            return result;
        }, {});
    }
}
