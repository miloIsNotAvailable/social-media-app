import { ExcludeExcept, IncludeExcept } from "../../../interfaces/custom";
import { Connect } from "./Connect";
import { Insert } from "./interfaces";

export class Query<T> extends Connect {
    
    table: string
    relations: string[]
    
    constructor( table: string, relations: string[] ) {
        super()
        this.table = table
        this.relations = relations
    }

    insert: <T, K extends keyof T>( 
        data_obj: Insert<T, K>
    ) => any = ( 
        d
    ) => {

        let data_keys = Object.keys( d.data as object );
        let data_vals = Object.values( d.data as object );

        return `insert into ${ this.table } (${ data_keys }) values(${ data_vals })`
    }
}