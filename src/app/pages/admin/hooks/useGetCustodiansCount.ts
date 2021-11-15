import { custodyAccounts } from 'config/apiURL'
import { custodyAccountsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useGetCustodiansCount = () => {
  const { apiService } = useServices()

  const getCustodiansCount = async () => {
    return await apiService.get(custodyAccounts.getCustodiansCount)
  }

  const { data, ...rest } = useQuery(
    custodyAccountsQueryKeys.getCustodiansCount,
    getCustodiansCount
  )
  return { ...rest, data: data?.data }
}
