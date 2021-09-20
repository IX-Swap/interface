import { useSearchQuery } from 'hooks/useSearchQuery'
import { useHistory } from 'react-router-dom'
import { AuthorizableStatus } from 'types/util'

export interface QueryFilters {
  search: string | undefined
  primaryOfferingSearch: string | undefined
  otcMarketSearch: string | undefined
  secondaryMarketSearch: string | undefined
  capitalStructure: string | undefined
  authorizationStatus: AuthorizableStatus | undefined
  fromDate: string | undefined
  toDate: string | undefined
  currentSlide: string | undefined
  currency: string | undefined
  identityType: string | undefined
  createdByAdmin: string | undefined
  pair: string | undefined
  pairFilter: string | undefined
  sortBy: string | undefined
  orderBy: 'ASC' | 'DSC' | undefined
  network: string | undefined
  isPriceAscending: string | undefined
  fundStatus: string | undefined
  transferType: string | undefined
  transferDirection: string | undefined
  dso: string | undefined
}

export type QueryFilter = keyof QueryFilters

export const useQueryFilter = () => {
  const { replace, location } = useHistory()
  const searchQuery = useSearchQuery()

  const updateFilters = (
    filters: Partial<Record<QueryFilter, string | undefined | null>>
  ) => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchQuery.set(key, value)
      }
    })

    setTimeout(() => {
      replace({
        ...location,
        search: searchQuery.toString()
      })
    }, 0)
  }

  const updateFilter = (key: QueryFilter, value: QueryFilters[QueryFilter]) => {
    if (value !== undefined) {
      searchQuery.set(key, value)

      setTimeout(() => {
        replace({
          ...location,
          search: searchQuery.toString()
        })
      }, 0)
    }
  }

  const getFilterValue = <TFilterKey extends QueryFilter>(
    key: QueryFilter,
    defaultValue?: QueryFilters[TFilterKey]
  ): QueryFilters[TFilterKey] => {
    return (searchQuery.get(key) as QueryFilters[TFilterKey]) ?? defaultValue
  }

  const removeFilter = (key: QueryFilter) => {
    searchQuery.delete(key)

    replace({
      ...location,
      search: searchQuery.toString()
    })
  }

  const removeFilters = (keys: QueryFilter[]) => {
    keys.forEach(key => searchQuery.delete(key))

    replace({
      ...location,
      search: searchQuery.toString()
    })
  }

  const getHasValue = (key: QueryFilter) => {
    const value = getFilterValue(key)

    return value === null || value === undefined
      ? false
      : value.trim().length > 0
  }

  return {
    updateFilter,
    updateFilters,
    getFilterValue,
    removeFilter,
    removeFilters,
    getHasValue,
    filter: searchQuery
  }
}
