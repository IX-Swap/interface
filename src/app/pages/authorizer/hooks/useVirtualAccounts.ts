import { virtualAccounts } from 'config/apiURL'
import { authorizerQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { VirtualAccount } from 'types/virtualAccount'

export const useVirtualAccounts = () => {
  const { apiService } = useServices()

  const getVirtualAccounts = async () => {
    return await apiService.post(virtualAccounts.getAll, {
      skip: 0,
      limit: 500
    })
  }

  const { data, ...rest } = useQuery(
    authorizerQueryKeys.getVirtualAccounts,
    getVirtualAccounts
  )

  const list: VirtualAccount[] = data?.data[0]?.documents

  return {
    ...rest,
    data: list
  }
}
