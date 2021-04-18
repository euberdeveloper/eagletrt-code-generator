import { StructureNetwork } from '../../../types';
import { StructureCanGathererGenerator } from './structureCanGathererGenerator';

/**
 * The StructureCanGathererSecondaryGenerator class, extending the [[StructureCanGathererGenerator]] class and generating the code that gathers the messages data from the secondary canbus network.
 */
class StructureCanGathererSecondaryGenerator extends StructureCanGathererGenerator {
    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_STRUCTURE_CAN_GATHERER_SECONDARY}}';

    /** The canbus network that the messages belong to */
    protected network: StructureNetwork = 'SECONDARY';
}

export { StructureCanGathererSecondaryGenerator as generator };
