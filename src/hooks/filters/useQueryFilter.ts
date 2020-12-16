import { useSearchQuery } from 'hooks/useSearchQuery'
import { useHistory } from 'react-router-dom'

export type QueryFilter = 'search' | 'capitalStructure'

export const useQueryFilter = () => {
  const { replace, location } = useHistory()
  const searchQuery = useSearchQuery()

  const updateFilter = (key: QueryFilter, value: string) => {
    searchQuery.set(key, value)

    replace({
      ...location,
      search: searchQuery.toString()
    })
  }

  const getFilterValue = (key: QueryFilter) => {
    return searchQuery.get(key)
  }

  const removeFilter = (key: QueryFilter) => {
    searchQuery.delete(key)

    replace({
      ...location,
      search: searchQuery.toString()
    })
  }

  const getHasValue = (key: QueryFilter) => {
    const value = getFilterValue(key)

    return value === null ? false : value.trim().length > 0
  }

  return {
    updateFilter,
    getFilterValue,
    removeFilter,
    getHasValue,
    filter: searchQuery
  }
}
