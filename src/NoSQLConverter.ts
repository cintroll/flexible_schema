import Converter from "./ConverterInterface";
import { BusinessInterfaceData, RegularAttribute } from "./FlexibleSchema";

type NoSQLInterfaceNestedParameter = {
    name : string;
    value : string | number;
};

type NoSQLInterfaceNestedData = {
    [key: string] : string | number;
};

type NoSQLInterfaceData = {
    [key: string] : string | number | NoSQLInterfaceNestedData | NoSQLInterfaceNestedParameter[];
};

export default class NoSQLConverter extends Converter<NoSQLInterfaceData> {

    convert(data: NoSQLInterfaceData, reg_attributes: RegularAttribute[]): BusinessInterfaceData {
        throw new Error("Method not implemented.");
    }
}