import { accountsURL } from 'config/apiURL'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import useAuth from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useGetCustody = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const getCustody = async () => {
    return await apiService.get(accountsURL.assets.custody(userId))
  }

  const { data, ...rest } = useQuery(
    digitalSecuritiesQueryKeys.custody(userId),
    getCustody
  )
  return {
    data: data?.data[0].documents,
    ...rest
  }
}
