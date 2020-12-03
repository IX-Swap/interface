import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { getIdFromObj } from 'helpers/strings'
import { withdrawalAddressQueryKeys } from 'config/queryKeys'

export const useWithdrawalAddressById = (
  withdrawalAddressId: string
): UseQueryData<WithdrawalAddress> => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const uri = `accounts/withdrawal-addresses/${userId}/${withdrawalAddressId}`
  const getWithdrawalAddress = async () => {
    return await apiService.get<WithdrawalAddress>(uri)
  }

  const { data, ...rest } = useQuery(
    [withdrawalAddressQueryKeys.getAddressById, userId, withdrawalAddressId],
    getWithdrawalAddress,
    { enabled: (withdrawalAddressId ?? '') !== '' }
  )

  return {
    ...rest,
    data: data?.data
  }
}
