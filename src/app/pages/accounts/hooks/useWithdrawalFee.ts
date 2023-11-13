import { accountsURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { WithdrawalFee } from 'types/dso'
import { isEmpty } from 'lodash'

export const useWithdrawalFee = (networkId: string) => {
  const { apiService } = useServices()
  const getWithdrawalFee = async () => {
    return await apiService.get<WithdrawalFee>(
      accountsURL.dsWithdrawals.getWithdrawalFee(networkId)
    )
  }

  const { data, ...rest } = useQuery(['withdrawal-fee'], getWithdrawalFee, {
    enabled: !isEmpty(networkId)
  })

  return {
    data: data?.data,
    ...rest
  }
}
