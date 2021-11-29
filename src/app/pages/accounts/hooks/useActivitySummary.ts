import { accountsURL } from 'config/apiURL'
import { reportsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { ActivitySummary } from 'types/reports'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export const useActivitySummary = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')

  const getActivitySummary = async () => {
    const uri = accountsURL.reports.getActivitySummary(userId)
    return await apiService.post<ActivitySummary>(uri, {
      from: fromDate,
      to: toDate
    })
  }

  const { data, ...rest } = useQuery(
    [reportsQueryKeys.getActivitySummary, { userId }],
    getActivitySummary
  )

  return {
    ...rest,
    data: data?.data
  }
}
