import { Options } from 'yargs';

export interface Command {
    command: string;
    description: string;
    options: Record<string, Options>;
    handler: (args: any) => void;
}
