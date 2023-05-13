import { ExcludeExcept, ExcludeMatchingProperties, IncludeExcept } from "../../../interfaces/custom"

export type IncludeMatchingProperties<T, V> = Pick<
T,
{ [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]
>;

type Primitives = string | number | bigint | boolean | symbol | null | undefined

type IncludeMatchingPropertiesNested<T> = {
    [ K in keyof T ]: IncludeMatchingProperties<K, Primitives>
}

export type Insert<T, K extends keyof T> = {
    data: Partial<IncludeMatchingProperties<T, Primitives>>
    include?: ExcludeMatchingProperties<T, Primitives>
}
