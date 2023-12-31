import Converter from "./ConverterInterface";
import { UnknownParameter } from "./Exceptions";
import { BusinessInterfaceData, RegularAttribute } from "./FlexibleSchema";

type DatabaseInterfaceNestedParameter = {
    name : string;
    value : string | number;
};

type DatabaseInterfaceNestedData = {
    [key: string] : string | number;
};

type DataBaseInterfaceBaseTypes = string | number;

type DatabaseInterfaceData = {
    [key: string] : DataBaseInterfaceBaseTypes | DatabaseInterfaceNestedData | DatabaseInterfaceNestedParameter[];
};

export default class DatabaseInterfaceConverter implements Converter<DatabaseInterfaceData> {

    /**
     * Private function to transform a complex database interface with multilevels
     * in a simple object with olny one layer
     * @param data data from the database interface
     * @returns the database interface convert to one a simple object
     */
    private flatten(data: DatabaseInterfaceData) : BusinessInterfaceData {
        let flatten_data : BusinessInterfaceData = {};
        const keys = Object.keys(data);

        for (const k of keys) {
            if (typeof data[k] === "string" || typeof data[k] === "number") {
                flatten_data[k] = data[k] as DataBaseInterfaceBaseTypes;
            } else if (Array.isArray(data[k])) {
                for (const attr of data[k] as DatabaseInterfaceNestedParameter[]) {
                    flatten_data[attr.name] = attr.value;
                }
            } else {
                flatten_data = {
                    ...flatten_data,
                    ...data[k] as DatabaseInterfaceNestedData
                };
            }
        }

        return flatten_data;
    }

    /**
     * This method should convert the data from the database interface to the
     * business interface.
     * 
     * @param data data from the database interface
     * @param reg_attributes regular attributes from business interface
     * @returns the data in the business interface data format
     */
    convert(data: DatabaseInterfaceData, reg_attributes: RegularAttribute[]): BusinessInterfaceData {
        let business_data : BusinessInterfaceData = {};
        let flatt_data = this.flatten(data);
        let keys = []

        for (const attr of reg_attributes) {
            let key = undefined;
            let map = undefined;

            if ( typeof attr === "string" ) {
                key = map = attr;
            } else {
                key = attr.name;
                map = attr.map;
            }

            if (map in flatt_data) {
                business_data[key] = flatt_data[map];
                keys.push(key);
            } else {
                throw new UnknownParameter(map + " not found in database interface data");
            }            
        }

        keys.forEach(k => delete flatt_data[k]);

        business_data = {
            ...business_data,
            ...flatt_data
        }

        return business_data;
    }
}