import * as path from 'path';

if (!process.env.IS_WEBPACK) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('module-alias/register');
}

import { Options } from '@lib/types';
import { Logger } from '@lib/utils/logger';
import { checkModelsSchema } from '@lib/utils/checkModelsSchema';
import { mergeOptions } from '@lib/utils/options';
import { getCodes } from '@lib/utils/getCodes';
import { transpile } from '@lib/utils/transpile';
import getGenerators from '@lib/generators';

export { Options } from '@lib/types';

/**
 * Fetches all the template files in the given folder (files whose extension is preceded
 * by .template) and generate the code inside the special comments (such as //{{COMMENT}})
 * @param src The folder where the template files will be fetched from. The default is the current folder.
 * @param structureModel The path to the json file containing the structure model, used by generators to dynamically generate code about the data structure. The default is structure.model.json.
 * @param configModel The path to the json file containing the config model, used by generators to dynamically generate code about the config parser. The default is config.model.json.
 * @param options The options specifying things such as logging, indentation and filters on the files
 */
export function generate(src?: string, structureModel?: string, configModel?: string, options?: Options): void {
    src = src ?? process.cwd();
    structureModel = structureModel ?? path.join(process.cwd(), 'structure.model.json');
    configModel = configModel ?? path.join(process.cwd(), 'config.model.json');
    const { structureModelObject, configModelObject } = checkModelsSchema(structureModel, configModel);
    options = mergeOptions(options);

    const logger = new Logger(options);
    const generators = getGenerators(logger);
    const codes = getCodes(structureModelObject, configModelObject, generators);
    transpile(src, codes, options, logger);
}
