import { QueryKey, useQueryCache } from 'react-query'
import { PaginatedQueryResponse, useParsedData } from './useParsedData'

export const useCachedPaginatedTableData = <T>(
  queryKey: QueryKey,
  dataKey: keyof T
) => {
  const cache = useQueryCache()
  const data = cache.getQueryData<PaginatedQueryResponse<T>>(queryKey)

  return {
    data: useParsedData(data, dataKey)
  }
}
