import { accountsURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { DepositAddress } from 'types/dso'

export const useDepositAddress = (tokenSymbol: string) => {
  const { apiService } = useServices()
  const getDepositAddress = async () => {
    return await apiService.post<DepositAddress>(
      accountsURL.digitalSecurities.getDepositAddress,
      {
        assetTicker: tokenSymbol
      }
    )
  }

  const { data, ...rest } = useQuery(
    [tokenSymbol, 'deposit-address'],
    getDepositAddress,
    {
      enabled: tokenSymbol !== undefined && tokenSymbol !== ''
    }
  )

  return {
    data: data?.data,
    ...rest
  }
}
