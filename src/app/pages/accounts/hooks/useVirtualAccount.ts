import { virtualAccounts } from 'config/apiURL'
import { balanceQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { VirtualAccount } from 'types/virtualAccount'

export const useVirtualAccount = (virtualAccountNumber?: string) => {
  const { data: list, ...rest } = useVirtualAccounts()

  const virtualAccount: VirtualAccount =
    list?.find(item => item.accountNumber === virtualAccountNumber) ?? list?.[0]

  return {
    ...rest,
    list,
    data: virtualAccount
  }
}

export const useVirtualAccounts = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()

  const getVirtualAccount = async () => {
    const uri = virtualAccounts.getByUserId(userId, 'All')
    return await apiService.get(uri)
  }

  const { data, ...rest } = useQuery(
    [balanceQueryKeys.getByUserId(userId)],
    getVirtualAccount
  )

  const list: VirtualAccount[] = data?.data[0]?.documents
  return { ...rest, data: list }
}
