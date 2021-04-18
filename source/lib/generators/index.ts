import * as path from 'path';
import { scan } from 'dree';
import { GeneratorConstructor } from '@lib/types';
import { Logger } from '@lib/utils/logger';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __non_webpack_require__: any;

/**
 * Returns all the generators classes, dynamically importing all the .generator files in the "generators" folder, analyizing in depth its directory structure.
 * @param logger
 */
export default function (logger: Logger): GeneratorConstructor[] {
    const generators: GeneratorConstructor[] = [];
    logger.info('Fetching code generators');

    const root = process.env.IS_WEBPACK ? path.join(__dirname, 'generators') : path.join(__dirname);
    scan(root, { extensions: ['js'] }, file => {
        if (file.name.includes('.generator')) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
            const generator: GeneratorConstructor = (process.env.IS_WEBPACK ? __non_webpack_require__ : require)(
                file.path
            ).generator;
            generators.push(generator);

            logger.succ(file.relativePath.replace('.js', ''), 'FETCHED', true);
        }
    });

    return generators;
}
