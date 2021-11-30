import { accountsURL } from 'config/apiURL'
import { reportsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { Dividend } from 'types/reports'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useDividends = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')

  const getDividends = async () => {
    const uri = accountsURL.reports.getDividends(userId)
    return await apiService.post<Dividend[]>(uri, {
      from: fromDate,
      to: toDate
    })
  }

  const { data, ...rest } = useQuery(
    [reportsQueryKeys.getDividends, { userId }],
    getDividends
  )

  return {
    ...rest,
    data: data?.data
  }
}
