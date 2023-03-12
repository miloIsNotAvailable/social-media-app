/**
 * @description adds loose type suggestion
 * @params T is custom type
 * @param K is either a string number or a symbol 
 */
export type Loose<T, K extends string | number | symbol> = Omit<T, K> | T