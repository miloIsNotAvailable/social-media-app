import Lexer from "./Lexer";

const l = new Lexer( "" )

export type ModelTableType = { 
    cols:  ReturnType<typeof l.getTablesCols>, 
    colTypes:  ReturnType<typeof l.getColType>[] 
    colNames:  ReturnType<typeof l.getColName>[]
    attrs:  ReturnType<typeof l.getColAttr>[], 
    constraintName:  ReturnType<typeof l.getConstraintName>[], 
    relation: ReturnType<typeof l.getRelationTable>[]
}

export class Compile extends Lexer {

    getModelByName = () => {

        const modelMap = new Map<string, ModelTableType>()
    
        this.tables.forEach( ( e, ind ) => {
            
            const cols = this.getTablesCols( e )
            const attrs = cols.map( this.getColAttr )
    
            const colTypes = cols.map( this.getColType )
            const colNames = cols.map( this.getColName )
    
            const constraintName = cols.map( this.getConstraintName ).filter( e => !!e )
    
            const zipped: ({ col: string, attr: string[] | null })[] = []
            cols.forEach( ( e, ind ) => {
                zipped.push( { col: e, attr: attrs[ ind ] } )
            } )
    
            const relation = zipped.map( ( { attr, col } ) => this.getRelationTable( attr, col ) ).filter( e => !!e )
    
            modelMap.set( this.tableNames[ind], { cols, colTypes, colNames, attrs, constraintName, relation } )
        } )
    
        return modelMap
    }

    get modelTable() {
        return this.getModelByName()
    }
}