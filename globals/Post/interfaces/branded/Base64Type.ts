export type Base64Type = string & { __brand: "Base64String" }

export const assertsBase64String = ( e: string ): asserts e is Base64Type => {
    if( !e.match( /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/ ) ) 
        // return
        throw new Error( "invalid file encoding" )
}

export const isBase64String = ( e: string ): e is Base64Type => {
    return !!e.match( "data:image" )
}