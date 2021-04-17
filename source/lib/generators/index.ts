import { scan } from 'dree';
import { GeneratorConstructor } from '../types';
import { Logger } from '../utils/logger';

/**
 * Returns all the generators classes, dynamically importing all the .generator files in the "generators" folder, analyizing in depth its directory structure.
 * @param logger
 */
export default function (logger: Logger): GeneratorConstructor[] {
    const generators: GeneratorConstructor[] = [];
    logger.info('Fetching code generators');

    scan(__dirname, { extensions: ['js'] }, file => {
        if (file.name.includes('.generator')) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
            const generator: GeneratorConstructor = require(file.path).generator;
            generators.push(generator);

            logger.succ(file.relativePath.replace('.js', ''), 'FETCHED', true);
        }
    });

    return generators;
}
