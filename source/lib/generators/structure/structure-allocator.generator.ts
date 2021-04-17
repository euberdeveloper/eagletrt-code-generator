import { ConfigModel, StructureMessagesGroup, StructureModel } from '../../types';
import { StructureGenerator } from './structureGenerator';

/**
 * The StructureAllocatorGenerator class, extending the StructureGenerator class and generating the code that allocates a data structure.
 */
class StructureAllocatorGenerator extends StructureGenerator {
    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_STRUCTURE_ALLOCATOR}}';

    /**
     * The constructor of the StructureAllocatorGenerator class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

    /**
     * Given the structure model generates the code that allocates the data structure.
     * @param data The structure model or one of its nested property values.
     */
    private parse(data: StructureMessagesGroup): void {
        for (const key in data) {
            const child = data[key];
            if (Array.isArray(child)) {
                this.keys.push(key);
                const keys = this.propName;
                const keysCount = this.propCountName;
                const type = this.structName;
                const message = child[0];
                this.print(`data${keys}_size = ${message.maxLength as string | number};`);
                this.print(`data${keys} = (${type}*) malloc(sizeof(${type}) * data${keys}_size);`);
                this.print(`data${keysCount} = 0;`);
                this.keys.pop();
            } else if (typeof child === 'object') {
                this.keys.push(key);
                this.parse(child);
                this.keys.pop();
            }
        }
    }

    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.structure);
    }
}

export { StructureAllocatorGenerator as generator };
