import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { VirtualAccount } from 'types/virtualAccount'

export const useVirtualAccountByUserId = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()

  const getVirtualAccount = async () => {
    const uri = virtualAccounts.getByUserId(userId)
    return await apiService.get<VirtualAccount[]>(uri)
  }

  const { data, ...rest } = useQuery(
    [virtualAccountQueryKeys.getByUserId, { userId }],
    getVirtualAccount
  )

  return {
    ...rest,
    data: data?.data
  }
}
