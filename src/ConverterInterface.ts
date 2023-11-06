import { BusinessInterfaceData } from "./FlexibleSchema";

export default interface Converter<T> {

    /**
     * This method should convert the data from the database interface to the
     * business interface.
     * 
     * @param data data from the database interface
     * @returns the data in the business interface data format
     */
    convert(data : T) : BusinessInterfaceData;
}