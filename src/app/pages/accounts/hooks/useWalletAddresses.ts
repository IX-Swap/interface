import { accountsURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useWalletAddresses = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const getWallets = async () => {
    return await apiService.post(
      accountsURL.withdrawalAddresses.getAll(userId),
      { skip: 0, limit: 100 }
    )
  }

  const { data, ...rest } = useQuery(['wallet-addresses'], getWallets)

  return {
    data: data?.data[0].documents,
    ...rest
  }
}
