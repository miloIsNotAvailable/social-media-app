import { ExcludeExcept, IncludeExcept } from "../../../interfaces/custom";
import { Connect } from "./Connect";
import { Insert } from "./interfaces";

export default class Query<T, K extends keyof T> extends Connect {
    
    table: string
    
    constructor( table: string ) {
        super()
        this.table = table
    }

    private _insert = async( 
        d: Insert<T, K>, 
        table_name: string 
    ) => {
        let data_keys = Object.keys( d.data as object );
        let data_vals = Object.values( d.data as object );

        return `insert into public.${ table_name } (${ data_keys }) values(${ data_vals })`
    }

    insert = async( 
        d: Insert<T, K>
    ) => {

        let res = [];

        let data_keys = Object.keys( d.data as object );
        let data_vals = Object.values( d.data as object );
        
        if( !d.include ) this._insert( d, this.table )
        
        res.push( this._insert( d, this.table ) )
        let data_keys_include = Object.keys( d.include as object )
        .map( x => this._insert( (d.include as any)[ x ], x.toUpperCase() ) );

        console.log( res )

        return `insert into ${ this.table } (${ data_keys }) values(${ data_vals })`
    }
}