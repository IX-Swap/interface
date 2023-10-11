import { accountsURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useWalletAddresses = (getByUser = true) => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const getWallets = async () => {
    return await apiService.post(
      getByUser
        ? accountsURL.withdrawalAddresses.getByUser(userId)
        : accountsURL.withdrawalAddresses.getAll(),
      { skip: 0, limit: 100 }
    )
  }

  const { data, ...rest } = useQuery(['wallet-addresses'], getWallets)

  return {
    data: data?.data[0].documents,
    ...rest
  }
}
