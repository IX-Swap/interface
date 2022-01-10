import { PairFilter } from 'hooks/types'
import { useCallback, useMemo } from 'react'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

const useMarketListFilters = (showFilter: boolean | undefined = false) => {
  const { getFilterValue } = useQueryFilter()
  const pairFilter = getFilterValue('pairFilter')
  const search = getFilterValue('search')
  const sortBy = getFilterValue('sortBy')
  const orderBy = getFilterValue('orderBy')
  const getSearchQuery = useCallback(() => {
    const isAll = pairFilter === PairFilter.ALL
    if (isAll) {
      return ''
    }
    const isCurrency =
      pairFilter === PairFilter.SGD || pairFilter === PairFilter.USD
    return isCurrency ? pairFilter : search
  }, [pairFilter, search])

  return useMemo(() => {
    const pairFilterIsFavorite = pairFilter === 'favorite'
    const isFavorite = pairFilterIsFavorite
    const currency = pairFilterIsFavorite ? 'all' : pairFilter

    const searchFilter = getSearchQuery()
    if (showFilter) {
      return {
        listingKeyword: searchFilter,
        isFavorite,
        currency,
        sortBy,
        orderBy
      }
    }
    return {
      listingKeyword: undefined,
      isFavorite: undefined,
      currency: undefined,
      sortBy: undefined,
      orderBy: undefined
    }
  }, [showFilter, pairFilter, orderBy, sortBy, getSearchQuery])
}

export default useMarketListFilters
