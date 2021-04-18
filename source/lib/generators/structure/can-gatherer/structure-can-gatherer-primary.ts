import { StructureNetwork } from '../../../types';
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
    protected network: StructureNetwork = 'PRIMARY';
}

export { StructureCanGathererPrimaryGenerator as generator };
