import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useGetPortfolios = (virtualAccountId: string) => {
  const { apiService } = useServices()

  const getPortfolios = async () => {
    const uri = virtualAccounts.getPortfolios(virtualAccountId)
    return await apiService.post(uri, {})
  }

  const { data, ...rest } = useQuery(
    [virtualAccountQueryKeys.getPortfolios, { virtualAccountId }],
    getPortfolios
  )

  return {
    ...rest,
    data: data?.data
  }
}
