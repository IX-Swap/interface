import { accountsURL } from 'config/apiURL'
import { reportsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { TradeItem } from 'types/reports'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useTradeConfirmation = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')

  const getTradeConfirmation = async () => {
    const uri = accountsURL.reports.getTradeConfirmation(userId)
    return await apiService.post<TradeItem[]>(uri, {
      from: fromDate,
      to: toDate
    })
  }

  const { data, ...rest } = useQuery(
    [reportsQueryKeys.getTradeConfirmation, { userId, fromDate, toDate }],
    getTradeConfirmation
  )

  return {
    ...rest,
    data: data?.data
  }
}
