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
        // rmeove array type
        // make object partial
        Partial<ArrayElement<ExcludeMatchingProperties<T, Primitives>[K]>>
    }
}
