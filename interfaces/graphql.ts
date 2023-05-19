import { ExpressContextFunctionArgument } from '@apollo/server/express4'

type funcType = {
    [name: string]: <T=any>( parents: any, args: T, context: contextType ) => any | Promise<T>
} 

export type rootType = {
    Query?: funcType,
    Mutation?: funcType
}


export type RootFunction = ( args: any, context: contextType ) => any | Promise<any>

export type contextType = ExpressContextFunctionArgument & { user: any | undefined }