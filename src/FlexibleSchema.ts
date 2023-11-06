export type RegularAttribute = {
    name: string
    map: string
} | String;

export type BusinessInterfaceData = {
    [key: string] : string | number
}

export default class FlexibleSchema {
    private reg_attributes : RegularAttribute[];

    /**
     * This class was designed to facilitate the integration 
     * of the database interface an the business interface.
     * 
     * @param attributes this parameter could be a list of parameters or a mapping 
     */
    constructor (attributes : RegularAttribute[]) {
        this.reg_attributes = attributes;
    }

    /**
     * This method convert the data from the database interface to the
     * business interface.
     * 
     * @param data data from the database interface
     * @returns the data in the business interface format
     */
    public convert(data: any) : BusinessInterfaceData {
        this.reg_attributes.forEach(element => {
            
        });

        return {};
    }
};
