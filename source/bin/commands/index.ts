if (!process.env.IS_WEBPACK) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('module-alias/register');
}

export { command as generateCommand } from './generate';
