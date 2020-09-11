import { AxiosResponse } from 'axios'
import { PaginatedData } from 'v2/services/api/types'
import { useMemo } from 'react'
import {
  convertDataArrayToMap,
  convertPaginatedResultToFlatArray
} from 'v2/hooks/utils'
import { QueryResult } from 'react-query/types/core/types'

export interface UseQueryData<T>
  extends Omit<QueryResult<AxiosResponse<T>, any>, 'data'> {
  data: T | undefined
}

export interface UsePaginatedQueryData<T>
  extends Omit<QueryResult<PaginatedQueryResponse<T>, any>, 'data'> {
  data: DataBucket<T>
}

export interface DataBucket<T> {
  raw: any
  map: { [key: string]: T }
  list: T[]
}

type PaginatedQueryResponse<T> = Array<AxiosResponse<PaginatedData<T>>>

export const useParsedData = <T>(
  data: PaginatedQueryResponse<T> | undefined,
  dataKey: keyof T
): DataBucket<T> => {
  const raw = useMemo(() => data ?? [], [data])
  const list = useMemo(() => convertPaginatedResultToFlatArray<T>(raw), [raw])
  const map = useMemo(() => convertDataArrayToMap<T>(dataKey, list), [
    dataKey,
    list
  ])

  return useMemo(() => ({ raw, list, map }), [raw, list, map])
}
