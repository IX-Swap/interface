import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { VirtualAccount } from 'types/virtualAccount'

export const useVirtualAccount = (virtualAccountNumber?: string) => {
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

  const list = data?.data[0]?.documents
  const virtualAccount: VirtualAccount =
    list?.find(
      (item: VirtualAccount) => item.accountNumber === virtualAccountNumber
    ) ?? list?.[0]

  return {
    ...rest,
    list,
    data: virtualAccount
  }
}
