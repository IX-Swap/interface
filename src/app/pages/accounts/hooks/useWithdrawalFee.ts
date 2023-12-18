import { accountsURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { WithdrawalFee } from 'types/dso'
import { isEmpty } from 'lodash'

export const useWithdrawalFee = (assetId: string) => {
  const { apiService } = useServices()
  const getWithdrawalFee = async () => {
    return await apiService.get<WithdrawalFee>(
      accountsURL.dsWithdrawals.getWithdrawalFee(assetId)
    )
  }

  const { data, ...rest } = useQuery(['withdrawal-fee'], getWithdrawalFee, {
    enabled: !isEmpty(assetId)
  })

  console.log('data', assetId)
  console.log('data', data)

  return {
    data,
    ...rest
  }
}
