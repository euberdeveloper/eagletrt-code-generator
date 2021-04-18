import { ConfigModel, StructureMessagesGroup, StructureModel } from '@lib/types';
import { StructureGenerator } from './structureGenerator';

/**
 * The StructureDeallocatorGenerator class, extending the StructureGenerator class and generating the code that deallocates a data structure.
 */
class StructureDeallocatorGenerator extends StructureGenerator {
    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_STRUCTURE_DEALLOCATOR}}';

    /**
     * The constructor of the StructureDeallocatorGenerator class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

    /**
     * Given the structure model generates the code that deallocates the data structure.
     * @param data The structure model or one of its nested property values.
     */
    private parse(data: StructureMessagesGroup): void {
        for (const key in data) {
            const child = data[key];
            if (Array.isArray(child)) {
                this.keys.push(key);
                this.print(`free(data${this.propName});`);
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
        this.print(`free(data);`);
    }
}

export { StructureDeallocatorGenerator as generator };
