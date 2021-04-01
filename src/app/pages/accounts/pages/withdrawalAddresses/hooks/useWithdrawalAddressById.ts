import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { getIdFromObj } from 'helpers/strings'
import { withdrawalAddressQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

export const useWithdrawalAddressById = (
  withdrawalAddressId: string,
  userId?: string
): UseQueryData<WithdrawalAddress> => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = accountsURL.withdrawalAddresses.getById(
    userId ?? getIdFromObj(user),
    withdrawalAddressId
  )
  const getWithdrawalAddress = async () => {
    return await apiService.get<WithdrawalAddress>(uri)
  }

  const { data, ...rest } = useQuery(
    [
      withdrawalAddressQueryKeys.getAddressById,
      userId ?? getIdFromObj(user),
      withdrawalAddressId
    ],
    getWithdrawalAddress,
    { enabled: (withdrawalAddressId ?? '') !== '' }
  )

  return {
    ...rest,
    data: data?.data
  }
}
