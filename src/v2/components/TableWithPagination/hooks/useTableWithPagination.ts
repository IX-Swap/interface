import { useState } from 'react'
import { queryCache, QueryStatus, useInfiniteQuery } from 'react-query'
import { useAPIService } from 'v2/hooks/useAPIService'
import { KeyValueMap, PaginatedData } from 'v2/services/api/types'
import { BaseFilter } from 'v2/types/util'

export interface UseTableWithPaginationReturnType<TData> {
  items: TData[]
  status: QueryStatus
  page: number
  rowsPerPage: number
  fetchMore: Function
  setPage: (page: number) => void
  setRowsPerPage: (count: number) => void
  total: number
}

export const useTableWithPagination = <TData>(
  queryKey: string,
  uri: string,
  filter?: BaseFilter
): UseTableWithPaginationReturnType<TData> => {
  const apiService = useAPIService()

  const [prevPage, setPrevPage] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = async (key: string, p: number, r: number, f?: BaseFilter) => {
    const payload: KeyValueMap<any> = {
      skip: p * r,
      limit: r,
      ...(filter || {})
    }

    return await apiService.request<PaginatedData<TData>>('POST', uri, payload)
  }

  const { data, status, fetchMore, isFetching } = useInfiniteQuery(
    [queryKey, page, rowsPerPage, filter],
    fetcher,
    {
      refetchOnWindowFocus: false
    }
  )

  const cached = queryCache.getQueryData<typeof data>([
    queryKey,
    prevPage,
    rowsPerPage,
    filter
  ])
  const previousPageData =
    cached !== undefined
      ? cached.map(page => page.data.data.length ? page.data.data[0].documents : [])[0]
      : []
  const currentPageData =
    data !== undefined ? data.map(page => page.data.data.length ? page.data.data[0].documents: [])[0] : []
  const total =
    data !== undefined && data.length > 0 && data[data.length - 1].data.data.length > 0
      ? data[data.length - 1].data.data[0].count ?? 0
      : 0;
  const items = isFetching ? previousPageData : currentPageData
  const _page = status === 'loading' ? 0 : page

  const _setPage = (nextPage: number): void => {
    if (nextPage === page) {
      queryCache.invalidateQueries(queryKey);
      return
    }
    setPrevPage(page)
    setPage(nextPage)
  }

  return {
    setPage: _setPage,
    page: _page,
    items,
    total,
    fetchMore,
    setRowsPerPage,
    rowsPerPage,
    status
  }
}
