"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseInterfaceConverter_1 = __importDefault(require("./DatabaseInterfaceConverter"));
class FlexibleSchema {
    /**
     * This class was designed to facilitate the integration
     * of the database interface an the business interface.
     *
     * @param attributes this parameter could be a list of parameters or a mapping
     */
    constructor(attributes) {
        this.reg_attributes = attributes;
    }
    /**
     * This method convert the data from the database interface to the
     * business interface.
     *
     * @param data data from the database interface
     * @returns the data in the business interface format
     */
    convert(data) {
        const converter = new DatabaseInterfaceConverter_1.default();
        return converter.convert(data, this.reg_attributes);
    }
}
exports.default = FlexibleSchema;
;
