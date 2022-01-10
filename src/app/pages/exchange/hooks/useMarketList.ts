import { useFavoritePairs } from 'app/pages/exchange/hooks/useFavoritePairs'
import { exchange as exchangeURL } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useCallback, useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'
import { PaginatedData } from 'services/api/types'

export interface Pair {
  _id: string
  name: string
  isFavorite: boolean
  latestPrice: number
  _24hChangePercentage: number
}

export const useMarketList = (showFilter: boolean | undefined = false) => {
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()
  const { data: favorites } = useFavoritePairs()
  const context = showFilter ? 'withFilter' : ''
  const pairFilter = getFilterValue('pairFilter')
  const search = getFilterValue('search')
  const sortBy = getFilterValue('sortBy')
  const orderBy = getFilterValue('orderBy')

  const getSearchQuery = useCallback((pairFilter?: string, search = '') => {
    const isAll = pairFilter === 'all'
    if (isAll) {
      return ''
    }
    const isCurrency = pairFilter !== 'favorite' && Boolean(pairFilter)
    return isCurrency ? pairFilter : search
  }, [])

  const filters = useMemo(() => {
    const pairFilterIsFavorite = pairFilter === 'favorite'
    const isFavorite = pairFilterIsFavorite ? true : undefined
    const currency = pairFilterIsFavorite ? 'all' : pairFilter

    const searchFilter = getSearchQuery(pairFilter, search)
    const filters = {
      search: showFilter ? searchFilter : undefined,
      isFavorite: showFilter ? isFavorite : undefined,
      currency: showFilter ? currency : undefined,
      sortBy: showFilter ? sortBy : undefined,
      orderBy: showFilter ? orderBy : undefined
    }

    return filters
  }, [showFilter, pairFilter, search, orderBy, sortBy, getSearchQuery])

  const fetchMarketList = async (
    queryKey: string,
    filters?: any,
    cursor: number | undefined = 0
  ) => {
    return await apiService.post<PaginatedData<Pair>>(exchangeURL.marketList, {
      skip: cursor,
      limit: 25,
      listingKeyword: filters.search
    })
  }

  const { data, ...rest } = useInfiniteQuery(
    [`${exchangeQueryKeys.marketList}-${context}`, filters],
    fetchMarketList,
    {
      getFetchMore: (lastGroup, allGroups) =>
        lastGroup.data?.[0].limit + lastGroup.data?.[0].skip
    }
  )

  const filterByFavorite = (list: Pair[]) => {
    const pairFilter = getFilterValue('pairFilter')
    if (
      pairFilter === 'favorite' &&
      favorites !== undefined &&
      favorites.length > 0
    ) {
      return list.filter((pair: Pair) => favorites.includes(pair._id))
    }
    return list
  }

  const parsedData = useParsedData<Pair>(data, '_id')
  return {
    data: {
      raw: parsedData.raw,
      map: parsedData.map,
      list: showFilter ? filterByFavorite(parsedData.list) : parsedData.list
    },
    ...rest
  }
}
