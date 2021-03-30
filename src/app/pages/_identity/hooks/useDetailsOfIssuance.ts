import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useDetailsOfIssuance = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const uri = identityURL.detailsOfIssuance.get(userId)
  const getDetailsOfIssuance = async () => {
    return await apiService.get(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getDetailsOfIssuance(userId)],
    getDetailsOfIssuance
  )

  return {
    ...rest,
    data: data?.data
  }
}
