import { QueryResult } from "pg";
import { ExcludeExcept, IncludeExcept } from "../../../interfaces/custom";
import { Connect } from "./Connect";
import { Insert, Like, Select } from "./interfaces";

export default class Query<T> extends Connect {
    
    private table: string
    private relations: { [ key: string ]: string }

    constructor( table: string, relations: { [ key: string ]: string } ) {
        super()
        this.table = `public.${table}`
        this.relations = relations
    }

    private is_test(): boolean {
        return process.env.JEST_WORKER_ID !== undefined
    }

    private test_env = ( query: string ) => {
        return this.is_test() ? 
        `begin;\n${query};\nrollback;` : 
        query
    }

    private test_env_result = ( res: QueryResult<any> | QueryResult<any>[] ) => {
        
        if( !this.is_test() ) return (res as QueryResult<any>).rows
        
        const [ , query_rows ] = res as QueryResult<any>[];
        return query_rows.rows
    }

    private _insert = ( 
        d: Insert<T>["data"], 
        table_name: string 
    ) => {
        let data_keys = Object.keys( d as object );
        let data_vals = Object.values( d as object ).map( x => `'${x}'` );

        return `insert into ${ table_name } (${ data_keys }) values(${ data_vals }) returning ${ data_keys }`
    }

    insert = async( 
        d: Insert<T>
    ) => {

        const client = await this.connect()

        try {

            let res = [];
        
            if( !d.include ) this._insert( d.data, this.table )
            
            res.push( this._insert( d.data, this.table ) )
            if( !!d.include ) {
                let data_keys_include = Object.keys( d.include as object )
                .map( x => this._insert( (d.include as any)[ x ], this.relations[ x ] ) );
            
                res.push( ...data_keys_include )
            }
    
            let query = this.test_env( res.join( ";\n" ) )

            console.log( query )
            let rows = await client.query( query )    

            return this.test_env_result( rows )  

        } catch( e ) {
            console.log( e )
        }

        // return `insert into ${ this.table } (${ data_keys }) values (${ data_vals })`
    }

    private select_guard = <T>( e: Like<T> | T ): e is Like<T> => {

        let like_obj = e as Like<T>
        return !!like_obj.LIKE
    }

    private _select_where_compare_statement = <T=any>( 
        like:Like<T> | T 
    ): string => {
        if( !this.select_guard( like ) ) return `= '${ ( like as T ) }'`

        return `LIKE '${ (like as Like<T>).LIKE }'`
    }

    private _select_where = ( where: Select<T>[ "where" ] ) => {

        if( !where ) return ""

        const res_compare_arr: string[] = []

        Object.values( where ).map( val => {
            res_compare_arr.push(
                this._select_where_compare_statement<typeof val>( val )
            )
        } )

        let keys = Object.keys( where ).map( x => `${this.table}.${x}` )

        return `where ${ keys.join( "," ) } ${ res_compare_arr.join( "AND" ) }`
    }

    private _select_include = ( 
        include: Select<T>["include"], 
        where: Select<T>["where"] 
    ): string => {

        if( !include || !where ) return ""

        const keys = Object.keys( include )
        .map( x => {
            let table = this.relations[ x ]
            return `inner join ${ table } on ${ this.table }.${ Object.keys( where ).join( "" ) } = public.${ table }.${ Object.keys( (include as any)[ x ] ).join( "" ) }`
        } )

        return keys.join( "\n" )
    }

    select = async( { data, include, where }: Select<T> ) => {

        const client = await this.connect()

        try {

            const where_ = this._select_where( where ) 
            const incl = this._select_include( include, where )
    
            const query = `select ${ Object.keys( data ).join( ", " ) } from ${ this.table } ${ incl } ${ where_ }`
            
            console.log( query )
            const rows = await client.query( query )

            return rows.rows
        } catch( e ) {
            console.log( e )
        }
    }
}