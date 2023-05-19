import { ArrayElement, ExcludeExcept, ExcludeMatchingProperties, IncludeExcept } from "../../../interfaces/custom"

/**
 * types for the orm query functions itself
 */

export type IncludeMatchingProperties<T, V> = Pick<
T,
{ [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]
>;

type Primitives = string | number | bigint | boolean | symbol | null | undefined

export type Insert<T> = {
    // data 
    data: Partial<IncludeMatchingProperties<T, Primitives>>
    // include aka table objects 
    // make all their properties optional
    include?: {
        // type
        [K in keyof ExcludeMatchingProperties<T, Primitives>]: 
        // remove array type
        // make object partial
        Partial<ArrayElement<ExcludeMatchingProperties<T, Primitives>[K]>>
    }
}

export type Like<T> = { LIKE: T }
export type Where<T> =  {
    [V in keyof 
    Partial<IncludeMatchingProperties<T, Primitives>>]: 
    Partial<IncludeMatchingProperties<T, Primitives>>[V] 
    | Like<Partial<IncludeMatchingProperties<T, Primitives>>[V]>
}

export type Select<T> = {
    // pick data to select
    data: {
        [V in keyof 
            Partial<IncludeMatchingProperties<T, Primitives>>]?: boolean
    }
    // where statamenet
    where?: Where<T>
    // if include make it an inner join
    include?: {
        [K in keyof ExcludeMatchingProperties<T, Primitives>]: 
        // remove array type
        // make object partial and a boolean
        { [
            V in keyof 
            Partial<ArrayElement<
            ExcludeMatchingProperties<T, Primitives>[K]
            >>
        ]?: boolean }
    }
}

export type Delete<T> = {
    // pick data to select
    returning?: {
        [V in keyof 
            Partial<IncludeMatchingProperties<T, Primitives>>]?: boolean
    }
    // where statamenet
    where?: Where<T>
}