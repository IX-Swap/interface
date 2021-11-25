import { accountsURL } from 'config/apiURL'
import { reportsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { ActivitySummary } from 'types/reports'
// import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useGetActivitySummary = () => {
  const { apiService } = useServices()
  // const { getFilterValue } = useQueryFilter()
  // const toDate = getFilterValue('toDate')
  // const fromDate = getFilterValue('fromDate')

  const getActivitySummary = async () => {
    const uri = accountsURL.reports.getActivitySummary
    // return await apiService.post<ActivitySummary>(uri, {from: fromDate, to: toDate})
    return await apiService.get<ActivitySummary>(uri)
  }

  const { data, ...rest } = useQuery(
    [reportsQueryKeys.getActivitySummary],
    getActivitySummary
  )

  return {
    ...rest,
    data: data?.data
  }
}
