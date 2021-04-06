import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { DetailsOfIssuance } from 'types/detailsOfIssuance'

export const useDetailsOfIssuance = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const uri = identityURL.detailsOfIssuance.get(userId)
  const getDetailsOfIssuance = async () => {
    return await apiService.get<DetailsOfIssuance>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getDetailsOfIssuance(userId)],
    getDetailsOfIssuance,
    { retry: false }
  )

  return {
    ...rest,
    data: data?.data
  }
}
