import { accountsURL } from 'config/apiURL'
import { reportsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { ExchangeFill } from 'types/reports'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useGetDistributionHistory = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')

  const getDistributionHistory = async () => {
    const uri = accountsURL.reports.getDistributionHistory(userId)
    return await apiService.post<ExchangeFill[]>(uri, {
      from: fromDate,
      to: toDate
    })
  }

  const { data, ...rest } = useQuery(
    [reportsQueryKeys.getDistributionHistory, { userId }],
    getDistributionHistory
  )

  return {
    ...rest,
    data: data?.data
  }
}
