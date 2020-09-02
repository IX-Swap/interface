import { AxiosResponse } from 'axios'
import { APIResponse, PaginatedData } from 'v2/services/api/types'
import { useMemo } from 'react'
import {
  convertDataArrayToMap,
  convertPaginatedResultToFlatArray
} from 'v2/hooks/utils'
import { QueryStatus } from 'react-query'

export interface UsePaginatedData<T> {
  data: DataBucket<T>
  status: QueryStatus
}

export interface DataBucket<T> {
  raw: any
  map: { [key: string]: T }
  list: T[]
}

type PaginatedQueryResponse<T> = Array<
  AxiosResponse<APIResponse<PaginatedData<T>>>
>

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
