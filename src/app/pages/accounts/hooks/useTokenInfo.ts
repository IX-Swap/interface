import { accountsURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useTokenInfo = (tokenSymbol: string) => {
  const { apiService } = useServices()
  const getTokenInfo = async () => {
    return await apiService.post(accountsURL.assets.getTokenInfo, {
      assetTicker: tokenSymbol
    })
  }

  const { data, ...rest } = useQuery(
    [tokenSymbol, 'token-info'],
    getTokenInfo,
    {
      enabled: tokenSymbol !== undefined && tokenSymbol !== ''
    }
  )

  return {
    data: data?.data,
    ...rest
  }
}
