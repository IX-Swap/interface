import { virtualAccounts } from 'config/apiURL'
import { authorizerQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { VirtualAccount } from 'types/virtualAccount'

export const useVirtualAccountById = (id: string) => {
  const { apiService } = useServices()

  const getVirtualAccountById = async () => {
    return await apiService.get(virtualAccounts.getById(id))
  }

  const { data, ...rest } = useQuery(
    authorizerQueryKeys.getVirtualAccountById(id),
    getVirtualAccountById
  )

  const virtualAccount: VirtualAccount | undefined = data?.data

  return {
    ...rest,
    data: virtualAccount
  }
}
