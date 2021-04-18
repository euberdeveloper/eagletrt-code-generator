import {
    ConfigModel,
    Generator,
    isStructureCompositeValue,
    isStructureMessage,
    isStructureValue,
    isStructureValuePrimitive,
    StructureMessage,
    StructureMessagesDetails,
    StructureMessagesGroup,
    StructureModel,
    StructureValue
} from '@lib/types';

/**
 * The type describing a key, which has the key string and its type that can be an array (such as [0]) or object  (such as .key).
 */
interface Key {
    /**
     * The actual value of the key.
     */
    key: string;
    /**
     * If the key is an array or an object.
     */
    type: 'array' | 'object';
}

/**
 * The BsonGenerator class, extending the Generator class and generating the code that creates from a data structure its bson object.
 */
class BsonGenerator extends Generator {
    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_BSON}}';
    /**
     * A stack of inspected keys.
     */
    private readonly keys: Key[] = [];
    /**
     * The current indentation as number of tabs.
     */
    private indentation = 0;
    /**
     * The current depth of the structure model.
     */
    private depth = 0;

    /**
     * The constructor of the BsonGenerator class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

    /**
     * Prints a line of generated code, fomatting it with the indentation and adding it to the code field.
     * @param str The line to print.
     */
    protected print(str: string): void {
        this.code += `${this.indentationTabs}${str}\n`;
    }

    /**
     * The max depth of the structure model.
     */
    private get maxDepth(): number {
        return this.getDepth(this.structure);
    }

    /**
     * The current bson object name, dependent on the current depth.
     */
    private get parsedDepth(): string {
        return this.depth === 0 ? '*bson_document' : `&children[${this.depth - 1}]`;
    }

    /**
     * Given the current inspected keys, returns the string that in C accesses that property.
     */
    private get parsedKeys(): string {
        return this.keys.reduce((acc, curr) => acc + this.parseKey(curr), '').replace('.', '->');
    }

    /**
     * The current key (0 if an array, the key if an object).
     */
    private get currentKey(): string {
        const last = this.keys[this.keys.length - 1];
        return last.type === 'array' ? '0' : last.key;
    }

    /**
     * The string of indentation tabs, dependent by the indentation field.
     * @returns The string of indentation tabs.
     */
    private get indentationTabs(): string {
        return Array(this.indentation).fill('\t').join('');
    }

    /**
     * Returns the maximum depth of the given structure model.
     * @param structure The structure model to analyze.
     * @returns The maximum depth of the given structure model.
     */
    private getDepth(structure: StructureMessagesGroup | StructureMessagesDetails | StructureMessage): number {
        let res: number;
        if (Array.isArray(structure)) {
            res = 1 + this.getDepth(structure[0]);
        } else if (typeof structure === 'object') {
            if (isStructureMessage(structure)) {
                res = isStructureCompositeValue(structure.value) ? 2 : 1;
            } else {
                let max = 0;
                for (const key in structure) {
                    if (typeof structure[key] === 'object') {
                        const n = 1 + this.getDepth(structure[key]);
                        max = n > max ? n : max;
                    }
                }
                res = max;
            }
        } else {
            res = 0;
        }
        return res;
    }

    /**
     * Parses a key to a string.
     * @param key The key to parse to a string.
     * @returns The key parsed to a string.
     */
    private parseKey(key: Key): string {
        switch (key.type) {
            case 'array':
                return `[${key.key}]`;
            case 'object':
                return `.${key.key}`;
        }
    }

    /**
     * Given a value, prints the code that translates it to bson.
     * @param data The primitive value.
     */
    private parseValue(data: StructureValue): void {
        const typeOfValue = isStructureValuePrimitive(data) ? data : data.type;

        switch (typeOfValue) {
            case 'int':
                this.print(`BSON_APPEND_INT32(${this.parsedDepth}, "${this.currentKey}", data${this.parsedKeys});`);
                break;
            case 'long':
                this.print(`BSON_APPEND_INT64(${this.parsedDepth}, "${this.currentKey}", data${this.parsedKeys});`);
                break;
            case 'float':
            case 'double':
                this.print(`BSON_APPEND_DOUBLE(${this.parsedDepth}, "${this.currentKey}", data${this.parsedKeys});`);
                break;
            case 'char*':
                this.print(`BSON_APPEND_UTF8(${this.parsedDepth}, "${this.currentKey}", data${this.parsedKeys});`);
                break;
        }
    }

    /**
     * Given a message, prints the code that translates it to bson.
     * @param data The object value.
     */
    private parseMessage(data: StructureMessage): void {
        const oldDepth = this.parsedDepth;
        this.depth++;
        const newDepth = this.parsedDepth;

        this.print(`BSON_APPEND_DOCUMENT_BEGIN(${oldDepth}, "${this.currentKey}", ${newDepth});`);

        const objectToParse = {
            timestamp: data.timestamp,
            value: data.value
        };

        for (const key in objectToParse) {
            this.keys.push({ type: 'object', key });
            this.parse(data[key]);
            this.keys.pop();
        }

        this.print(`bson_append_document_end(${oldDepth}, ${newDepth});`);
        this.print(`bson_destroy(${newDepth});`);

        this.depth--;
    }

    /**
     * Given an object group value, prints the code that translates it to bson.
     * @param data The object value.
     */
    private parseObjectGroup(data: StructureMessagesGroup): void {
        const oldDepth = this.parsedDepth;
        this.depth++;
        const newDepth = this.parsedDepth;

        this.print(`BSON_APPEND_DOCUMENT_BEGIN(${oldDepth}, "${this.currentKey}", ${newDepth});`);

        for (const key in data) {
            this.keys.push({ type: 'object', key });
            this.parse(data[key]);
            this.keys.pop();
        }

        this.print(`bson_append_document_end(${oldDepth}, ${newDepth});`);
        this.print(`bson_destroy(${newDepth});`);

        this.depth--;
    }

    /**
     * Given an array vlaue, prints the code that translates it to bson.
     * @param data The array value.
     */
    private parseArray(data: StructureMessagesDetails): void {
        const oldDepth = this.parsedDepth;
        this.depth++;
        const newDepth = this.parsedDepth;

        this.print(`BSON_APPEND_ARRAY_BEGIN(${oldDepth}, "${this.currentKey}", ${newDepth});`);
        this.print(`for (int i = 0; i < (data${this.parsedKeys}_count); i++)`);
        this.print(`{`);

        this.indentation++;
        this.keys.push({ key: 'i', type: 'array' });
        this.parseMessage(data[0]);
        this.keys.pop();
        this.indentation--;

        this.print(`}`);
        this.print(`bson_append_array_end(${oldDepth}, ${newDepth});`);
        this.print(`bson_destroy(${newDepth});`);

        this.depth--;
    }

    /**
     * Given the structure model generates the C code that translates it to bson.
     * @param data The structure model.
     */
    private parse(data: StructureMessagesGroup | StructureMessagesDetails | StructureValue): void {
        if (Array.isArray(data)) {
            this.parseArray(data);
        } else if (isStructureValue(data)) {
            this.parseValue(data);
        } else {
            this.parseObjectGroup(data);
        }
    }

    /**
     * Given the structure model generates the C code that translates it to bson.
     * @param data The structure model.
     */
    private firstParse(data: StructureModel): void {
        for (const key in data) {
            this.keys.push({ key, type: 'object' });
            this.parse(data[key]);
            this.keys.pop();
        }
    }

    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.print(`*bson_document = bson_new();`);
        this.print(`bson_t *children = (bson_t*)malloc(sizeof(bson_t) * ${this.maxDepth});`);
        this.firstParse(this.structure);
    }
}

export { BsonGenerator as generator };
