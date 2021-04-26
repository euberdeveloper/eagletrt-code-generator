import { generate, Options as GeneratorOptions } from '@lib';
import { options } from '@bin/utils/options';
import { Command } from '@bin/commands/types';

export const command: Command = {
    command: 'generate',
    description: 'Generate dinamically code for the eagletrt telemetry',
    options,
    handler: args => {
        const src: string = args.src;
        const structureModel: string = args.structureModel;
        const configModel: string = args.configModel;
        const options: GeneratorOptions = {
            extensions: args.extensions,
            log: args.log,
            indent: args.indent,
            exclude: args.exclude
        };
        generate(src, structureModel, configModel, options);
    }
};
