import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { AuthorizableStatus } from 'types/util'

export const useAuthorizerFilter = () => {
  const { getFilterValue } = useQueryFilter()
  const statusQueryValue = getFilterValue(
    'authorizationStatus',
    'Submitted'
  ) as AuthorizableStatus
  const fundStatusQueryValue = getFilterValue(
    'fundStatus',
    undefined
  ) as AuthorizableStatus
  const commitmentDSOQueryValue = getFilterValue('dso', undefined)
  const fromDateQueryValue = getFilterValue('fromDate', undefined)
  const toDateQueryValue = getFilterValue('toDate', undefined)
  const searchQueryValue = getFilterValue('search', undefined)
  const deploymentStatus = getFilterValue('deploymentStatus', undefined)

  return {
    filter: {
      search: searchQueryValue,
      status: statusQueryValue,
      fundStatus: fundStatusQueryValue,
      to: toDateQueryValue,
      from: fromDateQueryValue,
      dso: commitmentDSOQueryValue,
      deploymentStatus: deploymentStatus !== '' ? deploymentStatus : undefined
    }
  }
}
