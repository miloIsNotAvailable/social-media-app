import { ExcludeExcept, ExcludeMatchingProperties, IncludeExcept } from "../../../interfaces/custom"

export type Insert<T, K extends keyof T> = {
    data: IncludeExcept<T, K>
    include: ExcludeMatchingProperties<ExcludeExcept<T, K>, T>
}
