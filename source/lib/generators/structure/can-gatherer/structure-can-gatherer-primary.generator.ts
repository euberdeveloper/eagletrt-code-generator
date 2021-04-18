import { ConfigModel, StructureModel, StructureNetwork } from '../../../types';
import { StructureCanGathererGenerator } from './structureCanGathererGenerator';

/**
 * The StructureCanGathererPrimaryGenerator class, extending the [[StructureCanGathererGenerator]] class and generating the code that gathers the messages data from the primary canbus network.
 */
class StructureCanGathererPrimaryGenerator extends StructureCanGathererGenerator {
    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_STRUCTURE_CAN_GATHERER_PRIMARY}}';

    /** The canbus network that the messages belong to */
    protected network: StructureNetwork = 'Primary';

    /**
     * The constructor of the [[StructureCanGathererPrimaryGenerator]] class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }
}

export { StructureCanGathererPrimaryGenerator as generator };
