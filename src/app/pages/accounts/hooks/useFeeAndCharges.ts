import { accountsURL } from 'config/apiURL'
import { reportsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { FeeAndCharges } from 'types/reports'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export const useFeeAndCharges = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')

  const getFeeAndCharges = async () => {
    const uri = accountsURL.reports.getFeeAndCharges(userId)

    return await apiService.post<FeeAndCharges>(uri, {
      from: fromDate,
      to: toDate
    })
  }

  const { data, ...rest } = useQuery(
    [reportsQueryKeys.getFeeAndCharges, { userId, fromDate, toDate }],
    getFeeAndCharges
  )

  return {
    ...rest,
    data: data?.data
  }
}
