import Ajv from 'ajv';
import { readFileSync } from 'fs';

import * as structureSchema from '@lib/schemas/structure.schema.json';
import * as configSchema from '@lib/schemas/config.schema.json';
import { ConfigModel, StructureModel } from '@lib/types';

/**
 * Parses the structure.model.json and config.model.json given their paths. Checks them against their json-schema and throws an error if they does not match.
 * @param structureModel The path of the json structure model.
 * @param configModel The path of the json config model.
 * @return An object containing the structure and config models.
 */
export function checkModelsSchema(
    structureModel: string,
    configModel: string
): { structureModelObject: StructureModel; configModelObject: ConfigModel } {
    const ajv = new Ajv({ allowMatchingProperties: true });

    const structureModelObject: StructureModel = JSON.parse(readFileSync(structureModel, 'utf-8'));
    const configModelObject: ConfigModel = JSON.parse(readFileSync(configModel, 'utf-8'));

    ajv.addSchema(structureSchema, 'structure-schema');
    ajv.addSchema(configSchema, 'config-schema');

    if (!ajv.validate('structure-schema', structureModelObject)) {
        throw new Error('eagletrt-code-generator error: invalid structure model');
    }
    if (!ajv.validate('config-schema', configModelObject)) {
        throw new Error('eagletrt-code-generator error: invalid config model');
    }

    return { structureModelObject, configModelObject };
}
