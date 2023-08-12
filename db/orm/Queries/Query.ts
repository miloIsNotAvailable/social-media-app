import { QueryResult } from "pg";
import { ExcludeExcept, IncludeExcept } from "../../../interfaces/custom";
import { Connect } from "./Connect";
import { Delete, Insert, Like, Or, Select, Where } from "./interfaces";

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
    ): Promise<T[] | undefined> => {

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
            throw new Error( e as any )
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

    private _select_where = ( where?: Where<T> ) => {

        if( !where ) return ""

        const res_compare_arr: string[] = []

        Object.values( where ).map( val => {
            res_compare_arr.push(
                this._select_where_compare_statement<typeof val>( val )
            )
        } )

        console.log( res_compare_arr )

        let keys = Object.keys( where ).map( ( x, ind ) => `${this.table}.${x} ${res_compare_arr[ ind ] || "" }` )

        return `where ${ keys.join( "AND " ) }`
    }

    private _select_include = ( 
        select: Select<T>["include"], 
    ): string => {

        
        if( !select ) return ""
        
        // const { join, ...rest } = select
        // const key = Object.keys( rest )[0]
        
        // const { ...join_key_rest } = join;
        // const join_key = Object.keys(Object.values( join_key_rest )[0]!)[0]

        // console.log( join_key )

        const keys = Object.keys( select )
        .map( x => {

            // on always has only one property
            const { on, equal, include } = (select as any)[ x ]
            const include_ = !!include ? "\n" + this._select_include( (include as any) ) : ""
            const key = Object.keys( on )[0]
            const scnd_key = Object.keys( equal )[0]

            let table = this.relations[ x ]
            return `inner join public.${ table } on ${ this.table }.${ key } = public.${ table }.${ scnd_key }` + include_
        } )

        return keys.join( "\n" )
    }

    private get_data = ( 
        data: Select<T>["data"], 
        include: Select<T>["include"], 
        table_name: string = this.table,
        ) => {
            
        const data_arr = []

        const d = Object.keys( data )
        .map( x => typeof (data as any)[x] == "boolean" ? `${ table_name }.${ x }` : `${ table_name }.${ x } as ${ (data as any)[x] }` )
        .join( ", " )

        data_arr.push( d )

        console.log( d )
        if( !include ) return d

        const other_relations: any = Object.keys( include )
        .map( 
            x => this.get_data( 
                    (include as any)[ x ].data, 
                    (include as any)[ x ].include,
                    "public." + this.relations[ x ] 
                ) 
        )
        
        return [ d, other_relations.join( "," ) ].join( ", " )
        // console.log( { d, other_relations } )
    }

    select = async( { data, include, where }: Select<T> ): Promise<T[] | undefined> => {

        const client = await this.connect()

        try {

            const where_ = this._select_where( where ) 
            const incl = this._select_include( include )
    
            const select_keys = `${Object.keys( data ).map( x => `${ this.table }.${x}` ).join( ", " )}${ include ? `, ${ Object.keys( include ).map( x => `public.${ this.relations[ x ] }.*` ).join( ", " ) }` : "" }`
            const data_to_select = this.get_data( data, include, this.table )

            const query = `select ${ data_to_select } from ${ this.table } ${ incl } ${ where_ }`
            
            console.log( query )
            const rows = await client.query( query )

            return rows.rows
            // return undefined
        } catch( e ) {
            console.log( e )
        }
    }

    delete = async( { where, returning }: Delete<T> ) => {

        const client = await this.connect();

        try {

            const where_ = this._select_where( where )
            const returning_ = !returning ? "" : `returning ${ Object.keys( returning ) }`
    
            const query = `delete from ${ this.table } ${ where_ } ${ returning_ }`
    
            console.log( query )
            const rows = await client.query( this.test_env( query ) )
    
            const res = this.test_env_result( rows )
            return res
    
        } catch( e ) { console.log( e ) }

    }
}