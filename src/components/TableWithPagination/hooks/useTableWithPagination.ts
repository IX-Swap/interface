/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useMemo, useState } from 'react'
import { QueryStatus, useInfiniteQuery, useQueryCache } from 'react-query'
import { useAPIService } from 'hooks/useAPIService'
import { KeyValueMap, PaginatedData } from 'services/api/types'
import { BaseFilter } from 'types/util'
// import { useLocation } from 'react-router-dom'
import { useAppActions } from 'app/hooks/useAppState'

export interface UseTableWithPaginationReturnType<TData> {
  items: TData[]
  status: QueryStatus
  isLoading: boolean
  page: number
  rowsPerPage: number
  fetchMore: Function
  setPage: (page: number) => void
  setRowsPerPage: (count: number) => void
  total: number
  refetch: () => void
  sortOrder: string
  sortField: string
  setSortOrder: (sortOrder: string) => void
  setSortField: (sortField: string) => void
}

interface UseTableWithPaginationParams {
  queryKey?: string
  uri?: string
  defaultFilter: BaseFilter | undefined
  queryEnabled: boolean
  defaultRowsPerPage?: number
  disabledUseEffect?: boolean
  method?: 'POST' | 'GET'
}

export const useTableWithPagination = <TData>({
  queryKey,
  uri,
  defaultFilter,
  queryEnabled,
  defaultRowsPerPage,
  disabledUseEffect = false,
  method = 'POST'
}: UseTableWithPaginationParams): UseTableWithPaginationReturnType<TData> => {
  const queryCache = useQueryCache()
  const apiService = useAPIService()
  const [prevPage, setPrevPage] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(
    defaultRowsPerPage !== undefined ? defaultRowsPerPage : 25
  )
  const filter = defaultFilter
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortField, setSortField] = useState('createdAt')
  const { setTableHasData } = useAppActions()

  useEffect(() => {
    if (disabledUseEffect !== undefined && !disabledUseEffect) {
      setPage(0)
      setPrevPage(0)
    }
  }, [filter, disabledUseEffect])
  const [totalPage, setTotalPage] = useState(0)

  const fetcher = async (
    key: string,
    p: number,
    r: number,
    f?: BaseFilter,
    s?: string,
    sBy?: string
  ) => {
    const { isFavorite, isFavoriteCount }: Storage = localStorage
    if (
      isFavorite !== null &&
      isFavorite !== undefined &&
      isFavorite === 'true' &&
      isFavoriteCount === null
    ) {
      p = 0
      localStorage.setItem('isFavoriteCount', '1')
    } else {
      localStorage.removeItem('isFavoriteCount')
      localStorage.removeItem('isFavorite')
    }

    const payload: KeyValueMap<any> = {
      skip: p * r,
      limit: r,
      sortOrder: s === 'asc' ? 1 : -1,
      sortField: sBy,
      ...(filter ?? {})
    }
    const result =
      method === 'POST'
        ? await apiService.post<PaginatedData<TData>>(uri!, payload)
        : await apiService.get<PaginatedData<TData>>(uri!, payload)

    const hasNoInitialResult =
      payload?.search === undefined && result?.data[0]?.count < 1

    setTableHasData(!hasNoInitialResult)

    setTotalPage(result?.data[0]?.count)
    return result
  }

  const {
    data: _data,
    status,
    fetchMore,
    isFetching,
    isLoading,
    isFetchingMore
  } = useInfiniteQuery(
    [queryKey, page, rowsPerPage, filter, sortOrder, sortField],
    fetcher,
    {
      enabled: uri !== undefined && queryEnabled
    }
  )

  const data = useMemo(
    () => (_data !== undefined ? _data.filter(page => page !== undefined) : []),
    [_data]
  )

  const cached = useMemo(
    () =>
      queryCache.getQueryData<typeof data>([
        queryKey,
        prevPage,
        rowsPerPage,
        filter
      ]),
    [queryKey, prevPage, rowsPerPage, filter, queryCache]
  )
  const previousPageData =
    cached !== undefined
      ? cached.map(page =>
          page.data !== undefined && page.data.length > 0
            ? page.data[0].documents
            : []
        )[0]
      : []

  const currentPageData =
    data !== undefined && data.length > 0
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
      ? totalPage ?? 0
      : 0
  const isActuallyLoading = isLoading || isFetching || Boolean(isFetchingMore)
  const items = isActuallyLoading ? previousPageData : currentPageData
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
  const refetch = () => {
    void queryCache.removeQueries({ queryKey, exact: true })
    setPage(page)
  }

  return {
    setPage: _setPage,
    page: _page,
    items,
    total,
    fetchMore,
    setRowsPerPage,
    rowsPerPage,
    status,
    isLoading: isActuallyLoading,
    refetch,
    sortOrder,
    sortField,
    setSortOrder,
    setSortField
  }
}
