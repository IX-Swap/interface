import { UseQueryData } from 'v2/hooks/useParsedData'
import { useServices } from 'v2/hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { WithdrawalAddress } from 'v2/types/withdrawalAddress'
import { getIdFromObj } from 'v2/helpers/strings'

export const USER_WITHDRAWAL_ADDRESS_BY_ID_KEY = 'withdrawalAddress'

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
    [USER_WITHDRAWAL_ADDRESS_BY_ID_KEY, userId, withdrawalAddressId],
    getWithdrawalAddress,
    { enabled: (withdrawalAddressId ?? '') !== '' }
  )

  return {
    ...rest,
    data: data?.data
  }
}
