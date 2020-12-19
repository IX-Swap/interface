import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useAuthorizerFilter = () => {
  const { getFilterValue } = useQueryFilter()
  const statusQueryValue = getFilterValue('authorizationStatus', 'Submitted')
  const fromDateQueryValue = getFilterValue('fromDate', undefined)
  const toDateQueryValue = getFilterValue('toDate', undefined)
  const searchQueryValue = getFilterValue('search', undefined)

  return {
    filter: {
      search: searchQueryValue,
      status: statusQueryValue,
      to: toDateQueryValue,
      from: fromDateQueryValue
    }
  }
}
