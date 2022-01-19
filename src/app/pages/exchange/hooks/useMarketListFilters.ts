import { PairFilter } from 'hooks/types'
import { useCallback, useMemo } from 'react'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

const useMarketListFilters = (showFilter: boolean | undefined = false) => {
  const { getFilterValue } = useQueryFilter()
  const pairFilter = getFilterValue('pairFilter')
  const search = getFilterValue('search')
  const sortBy = getFilterValue('sortBy')
  const orderBy = getFilterValue('orderBy')
  const getSearchQuery = useCallback(
    () => (pairFilter === PairFilter.ALL ? '' : search),

    [search, pairFilter]
  )

  return useMemo(() => {
    const pairFilterIsFavorite = pairFilter === PairFilter.FAVORITE
    const currency =
      pairFilter === PairFilter.USD || pairFilter === PairFilter.SGD
        ? pairFilter
        : ''
    const searchFilter = getSearchQuery()
    if (showFilter) {
      return {
        listingKeyword: searchFilter,
        isFavorite: pairFilterIsFavorite,
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
