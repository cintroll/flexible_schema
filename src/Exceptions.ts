/**
 * Error for invalid Regular Parameter
 */
export class UnknownParameter extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        this.name = 'UnknownParameter';
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}