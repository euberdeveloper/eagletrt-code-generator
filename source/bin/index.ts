#!/usr/bin/env node
import * as yargs from 'yargs';

if (!process.env.IS_WEBPACK) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('module-alias/register');
}

import { generateCommand } from '@bin/commands';

yargs
    .scriptName('eagletrt-cg')
    .command(
        generateCommand.command,
        generateCommand.description,
        yargs => {
            yargs.options(generateCommand.options);
        },
        args => {
            generateCommand.handler(args);
        }
    )
    .demandCommand(1, 'You must enter a command')
    .strict()
    .epilogue('For more information, find our manual at https://github.com/eagletrt/code-generator#readme').argv;
