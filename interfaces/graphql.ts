import { ExpressContextFunctionArgument } from '@apollo/server/express4'

type funcType = {
    [name: string]: ( parents: any, args: any, context: contextType ) => any | Promise<any>
} 

export type rootType = {
    Query?: funcType,
    Mutation?: funcType
}


export type RootFunction = ( args: any, context: contextType ) => any | Promise<any>

export type contextType = ExpressContextFunctionArgument & { user: any | undefined }