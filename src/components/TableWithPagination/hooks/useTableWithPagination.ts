import { useEffect, useState } from 'react'
import { QueryStatus, useInfiniteQuery, useQueryCache } from 'react-query'
import { useAPIService } from 'hooks/useAPIService'
import { KeyValueMap, PaginatedData } from 'services/api/types'
import { BaseFilter } from 'types/util'

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
  defaultFilter: BaseFilter | undefined,
  queryEnabled: boolean,
  defaultRowsPerPage?: number
): UseTableWithPaginationReturnType<TData> => {
  const queryCache = useQueryCache()
  const apiService = useAPIService()
  const [prevPage, setPrevPage] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(
    defaultRowsPerPage !== undefined ? defaultRowsPerPage : 25
  )
  const filter = defaultFilter

  useEffect(() => {
    setPage(0)
    setPrevPage(0)
  }, [filter])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = async (key: string, p: number, r: number, f?: BaseFilter) => {
    const payload: KeyValueMap<any> = {
      skip: p * r,
      limit: r,
      ...(filter ?? {})
    }

    return await apiService.post<PaginatedData<TData>>(uri, payload)
  }

  const { data, status, fetchMore, isFetching } = useInfiniteQuery(
    [queryKey, page, rowsPerPage, filter],
    fetcher,
    { enabled: queryEnabled }
  )

  const cached = queryCache.getQueryData<typeof data>([
    queryKey,
    prevPage,
    rowsPerPage,
    filter
  ])
  const previousPageData =
    cached !== undefined
      ? cached.map(page =>
          page.data !== undefined && page.data.length > 0
            ? page.data[0].documents
            : []
        )[0]
      : []

  const currentPageData =
    data !== undefined
      ? data.map(page =>
          page.data !== undefined && page.data.length > 0
            ? page.data[0].documents.length > 0
              ? page.data[0].documents
              : previousPageData
            : []
        )[0]
      : []
  const total =
    data !== undefined &&
    data.length > 0 &&
    data[data.length - 1].data !== undefined &&
    data[data.length - 1].data.length > 0
      ? data[data.length - 1].data[0].count ?? 0
      : 0
  const items = isFetching ? previousPageData : currentPageData
  const _page = status === 'loading' ? 0 : page

  const _setPage = (nextPage: number): void => {
    if (nextPage === page) {
      // eslint-disable-next-line no-void
      void queryCache.invalidateQueries(queryKey)
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
