/**
 * @class **Lexer**
 * ---
 * 
 * @description includes functions that get general info about the schema
 * such as tables, columns, table names, column attributes
 * ---
 * @param tables is an array of tables
 * @example ```ts
 * [ "model User { username String }" ]
 * ```
 * ---
 * @param tableNames is an array with table names going from 
 * most upper table to lowest table
 */
export default class Lexer {

    table: string
    constructor( table: string ) {
        this.table = table
    }

    private getAllTables: ( tables: string ) => string[] = ( tables ) => {

        const tablesSplit = tables.split( /(?=model)/ )

        return tablesSplit.filter( ( e ) => !!e.trim() )
    }

    private getTableName = ( table: string ) => {

        const tableName = table.match( /\model (.*) \{/ )
        return tableName![1]
    }

    private stripToCols = ( table: string ) => {
        const tableStripped = table.replace( /model (.*) \{/, "" ).replace( /\}/, "" )
    
        return tableStripped
    }
    
    getTablesCols = ( table: string ) => {
    
        const stripped = this.stripToCols( table )
    
        const cols = stripped.split( "\n" )
    
        return cols.filter( e => !!e.trim() )
    }

    getColType = ( cols: string ) => {
    
        const types = cols.match( "(Int|String|DateTime|Float|Boolean|" + this.tableNames.join( "|" ) + ")(.+?){0,2}" )
    
        return types ? types[0]
        .replace( " @", "" )  
        : null
    }
    
    getColName = ( cols: string ) => {
        
        const types = cols.match( /[a-z]+/gi )
        return types ? types[0] : null
    }

    getColAttr = ( col: string ) => {
        return col.match( /@[a-z]+(\((.*)\)|\.[a-z]+)*/ig ) as string[] | null
    }    

    get tables() {
        return this.getAllTables( this.table )
    }

    get tableNames() {

        return this.tables.map( this.getTableName )
    }
}