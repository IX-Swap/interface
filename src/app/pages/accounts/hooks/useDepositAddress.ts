import { accountsURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { DepositAddress } from 'types/dso'
import { isEmpty } from 'lodash'

export const useDepositAddress = (assetId: string) => {
  const { apiService } = useServices()
  const getDepositAddress = async () => {
    return await apiService.get<DepositAddress>(
      accountsURL.securityToken.getDepositAddress(assetId)
    )
  }

  const { data, ...rest } = useQuery(['deposit-address'], getDepositAddress, {
    enabled: !isEmpty(assetId)
  })

  return {
    data: data?.data,
    ...rest
  }
}
