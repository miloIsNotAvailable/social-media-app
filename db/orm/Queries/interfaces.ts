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
        [K in keyof ExcludeMatchingProperties<T, Primitives>]?: 
        // remove array type
        // make object partial
        Partial<ArrayElement<ExcludeMatchingProperties<T, Primitives>[K]>>
    }
}

export type Like<T> = { LIKE: T }
export type Or<T> = { Or: T }
export type Where<T> =  AtMostTwoKeys<{
    [V in keyof 
    Partial<IncludeMatchingProperties<T, Primitives>>]: 
    Partial<IncludeMatchingProperties<T, Primitives>>[V] 
    | Like<Partial<IncludeMatchingProperties<T, Primitives>>[V]>
    | Or<Partial<IncludeMatchingProperties<T, Primitives>>[V]>
}>

type PickOnly<T, K extends keyof T> =
    Pick<T, K> & { [P in Exclude<keyof T, K>]?: never };

type AtMostOneKey<T> = (
    PickOnly<T, never> |
    { [K in keyof T]-?: PickOnly<T, K>
    }[keyof T]
) extends infer O ? { [P in keyof O]: O[P] } : never    

export type AtMostTwoKeys<T> = (
    PickOnly<T, never> |
    { [K in keyof T]-?: PickOnly<T, K>
    }[keyof T] |
    { [K in keyof T]-?: PickOnly<T, K>
    }[keyof T]
) extends infer O ? { [P in keyof O]: O[P] } : never    

export type Select<T> = {
    // pick data to select
    data: {
        [V in keyof 
            Partial<IncludeMatchingProperties<T, Primitives>>]?: boolean | string
    }

    // if include make it an inner join
    include?:  Partial<{
            [K in keyof ExcludeMatchingProperties<T, Primitives>]: 
            { equal: AtMostOneKey<{
                [V in keyof 
                    Partial<IncludeMatchingProperties<ArrayElement<NonNullable<ExcludeMatchingProperties<T, Primitives>[K]>>, Primitives>>]?: boolean
            }> } 
            & { on: AtMostOneKey<{
                [V in keyof 
                    Partial<
                        IncludeMatchingProperties<T, Primitives>
                    >]?: boolean
            }> } 
            & Select<
                    // make type non nulable otherwise types break
                    ArrayElement<NonNullable<ExcludeMatchingProperties<T, Primitives>[K]>>
                >
    }>
    // where statamenet
    where?: Where<T>
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