"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConverterInterface_1 = __importDefault(require("./ConverterInterface"));
const Exceptions_1 = require("./Exceptions");
class DatabaseInterfaceConverter extends ConverterInterface_1.default {
    flatten(data) {
        let flatten_data = {};
        const keys = Object.keys(data);
        for (const k of keys) {
            if (typeof data[k] === "string" || typeof data[k] === "number") {
                flatten_data[k] = data[k];
            }
            else if (Array.isArray(data[k])) {
                for (const attr of data[k]) {
                    flatten_data[attr.name] = attr.value;
                }
            }
            else {
                flatten_data = Object.assign(Object.assign({}, flatten_data), data[k]);
            }
        }
        return flatten_data;
    }
    convert(data, reg_attributes) {
        let business_data = {};
        let flatt_data = this.flatten(data);
        let keys = [];
        for (const attr of reg_attributes) {
            let key = undefined;
            let map = undefined;
            if (typeof attr === "string") {
                key = map = attr;
            }
            else {
                key = attr.name;
                map = attr.map;
            }
            if (key in flatt_data) {
                business_data[key] = flatt_data[map];
                keys.push(key);
            }
            else {
                throw new Exceptions_1.UnknownParameter(key + " not found in database interface data");
            }
        }
        keys.forEach(k => delete flatt_data[k]);
        business_data = Object.assign(Object.assign({}, business_data), flatt_data);
        return business_data;
    }
}
exports.default = DatabaseInterfaceConverter;
