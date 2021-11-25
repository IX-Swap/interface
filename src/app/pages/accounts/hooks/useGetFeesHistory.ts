import { accountsURL } from 'config/apiURL'
import { reportsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { ExchangeFill } from 'types/reports'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useGetFeesHistory = () => {
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')

  const getFeesHistory = async () => {
    const uri = accountsURL.reports.getFeesHistory

    return await apiService.post<ExchangeFill[]>(uri, {
      from: fromDate,
      to: toDate
    })
  }

  const { data, ...rest } = useQuery(
    [reportsQueryKeys.getFeesHistory],
    getFeesHistory
  )

  return {
    ...rest,
    data: data?.data
  }
}
