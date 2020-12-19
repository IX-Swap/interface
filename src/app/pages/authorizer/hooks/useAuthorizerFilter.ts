import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { AuthorizableStatus } from 'types/util'

export const useAuthorizerFilter = () => {
  const { getFilterValue } = useQueryFilter()
  const statusQueryValue = getFilterValue('authorizationStatus', 'Submitted') as AuthorizableStatus
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
