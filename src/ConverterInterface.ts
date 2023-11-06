import { BusinessInterfaceData, RegularAttribute } from "./FlexibleSchema";

export default abstract class Converter<T> {

    /**
     * This method should convert the data from the database interface to the
     * business interface.
     * 
     * @param data data from the database interface
     * @param reg_attributes regular attributes from business interface
     * @returns the data in the business interface data format
     */
    abstract convert(data : T, reg_attributes: RegularAttribute[]) : BusinessInterfaceData;
}