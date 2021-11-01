import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useGetBalances = (virtualAccountId: string) => {
  const { apiService } = useServices()

  const getBalances = async () => {
    const uri = virtualAccounts.getBalances(virtualAccountId)
    return await apiService.post(uri, {})
  }

  const { data, ...rest } = useQuery(
    [virtualAccountQueryKeys.getBalances, { virtualAccountId }],
    getBalances
  )

  return {
    ...rest,
    data: data?.data
  }
}
