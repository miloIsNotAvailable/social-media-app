/**
 * @description adds loose type suggestion
 * @params T is custom type
 * @param K is either a string number or a symbol 
 */
export type Loose<T, K extends string | number | symbol> = Omit<T, K> | T

/**
 * @param IncludeExcept
 * @description removes chosen types
 * 
 * @example type post = { id: number, name: string, password: string, title: string }
 * type PostExcluded = IncludeExcept<post, "id"> // { name: string, password: string, title: string }
 * 
 * @param T is the type
 * @param K is the matching property
 */
export type IncludeExcept<T, K extends keyof T> = Omit<T, K>

/**
 * @param ExcludeExcept
 * @description removes all types besides chosen ones
 * 
 * @example type post = { id: number, name: string, password: string, title: string }
 * type PostExcluded = ExcludeExcept<post, "id"> // { id: number }
 * 
 * @param T is the type
 * @param K is the matching property
 */
export type ExcludeExcept<T, K extends keyof T> = Pick<T, { [ V in keyof T ]-?: never }[keyof T]> & Pick<T, K>

/**
 * @param ExcludeMatchingProperties
 * @description excludes matching properties
 * 
 * @example type post = { id: number, title: string }
 * type PostExcluded = ExcludeMatchingProperties<post, number> // { id: number }
 * 
 * @param T is the type
 * @param K is the matching property
 */
export type ExcludeMatchingProperties<T, V> = Pick<
T,
{ [K in keyof T]-?: T[K] extends V ? never : K }[keyof T]
>;

/**
 * @param ArrayType is array type 
 * @description removes array type from type
 * @example ```ts
 * type A = ArrayElement<User[]> // same as User
 * ```
 */
export type ArrayElement<ArrayType extends unknown> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;