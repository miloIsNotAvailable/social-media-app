import { ExcludeExcept, IncludeExcept } from "../../../interfaces/custom";
import { Connect } from "./Connect";
import { Insert } from "./interfaces";

export default class Query<T> extends Connect {
    
    private table: string
    private relations: { [ key: string ]: string }

    constructor( table: string, relations: { [ key: string ]: string } ) {
        super()
        this.table = table
        this.relations = relations
    }

    private _insert = ( 
        d: Insert<T>["data"], 
        table_name: string 
    ) => {
        let data_keys = Object.keys( d as object );
        let data_vals = Object.values( d as object );

        return `insert into public.${ table_name } (${ data_keys }) values(${ data_vals })`
    }

    insert = async( 
        d: Insert<T>
    ) => {

        let res = [];

        let data_keys = Object.keys( d.data as object );
        let data_vals = Object.values( d.data as object );
        
        if( !d.include ) this._insert( d.data, this.table )
        
        res.push( this._insert( d.data, this.table ) )
        if( !!d.include ) {
            let data_keys_include = Object.keys( d.include as object )
            .map( x => this._insert( (d.include as any)[ x ], this.relations[ x ] ) );
        
            res.push( ...data_keys_include )
        }

        console.log( res )

        // return `insert into ${ this.table } (${ data_keys }) values (${ data_vals })`
    }
}