"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownParameter = void 0;
/**
 * Error for invalid Regular Parameter
 */
class UnknownParameter extends Error {
    constructor(message) {
        super(message); // 'Error' breaks prototype chain here
        this.name = 'UnknownParameter';
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}
exports.UnknownParameter = UnknownParameter;
