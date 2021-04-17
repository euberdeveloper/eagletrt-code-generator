import { ConfigModel } from '../config';
import { StructureModel } from '../structure';

/**
 * The interface of the objects containing the template comment and the associated generated code.
 */
export interface Code {
    /**
     * The template comment.
     */
    comment: string;
    /**
     * The generated code.
     */
    code: string;
}

/**
 * The class that all generators extends.
 */
export abstract class Generator {

    /**
     * The generated code.
     */
     protected code = '';

    /**
     * The template comment that this generator handles.
     */
    protected abstract comment: string;

    /**
     * Returns the generated Code object.
     */
    public get generated(): Code {
        return {
            comment: this.comment,
            code: this.code
        };
    }

    /**
     * The constructor of the Generator class.
     * @param structure The structure model: the generated code could depend on it.
     * @param config The config model: the generated code could depend on it.
     */
    public constructor(protected structure: StructureModel, protected config: ConfigModel) {}
    
    /**
     * Prints a line of generated code, fomatting it and adding it to the code field.
     * @param str The line to print.
     */
    protected print(str: string): void {
        this.code += `${str}\n`;
    }

    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected abstract generate(): void;

}