import { useSearchQuery } from 'hooks/useSearchQuery'
import { useHistory } from 'react-router-dom'

export type QueryFilter = 'search'

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

  const getAllFilterValues = (key: QueryFilter) => {
    return searchQuery.getAll(key)
  }

  const removeFilter = (key: QueryFilter) => {
    searchQuery.delete(key)

    replace({
      ...location,
      search: searchQuery.toString()
    })
  }

  const getHasValue = (key: QueryFilter) => {
    return searchQuery.has(key)
  }

  return {
    updateFilter,
    getFilterValue,
    getAllFilterValues,
    removeFilter,
    getHasValue,
    filter: searchQuery
  }
}
