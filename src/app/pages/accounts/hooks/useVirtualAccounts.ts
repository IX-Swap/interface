import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useVirtualAccounts = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()

  const getVirtualAccount = async () => {
    const uri = virtualAccounts.getByUserId(userId)
    return await apiService.get(uri)
  }

  const { data, ...rest } = useQuery(
    [virtualAccountQueryKeys.getByUserId, { userId }],
    getVirtualAccount
  )

  return {
    ...rest,
    data: data?.data[0].documents
  }
}
