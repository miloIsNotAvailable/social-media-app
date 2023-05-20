import { ExpressContextFunctionArgument } from '@apollo/server/express4'

export type GraphqlResolver<T = any> = ( parents: any, args: T, context: contextType ) => any | Promise<T>

export type FuncType = {
    [name: string]: GraphqlResolver
} 

export type rootType = {
    Query?: FuncType,
    Mutation?: FuncType
}


export type RootFunction = ( args: any, context: contextType ) => any | Promise<any>

export type contextType = ExpressContextFunctionArgument & { user: any | undefined }