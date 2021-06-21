import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { DetailsOfIssuance } from 'types/detailsOfIssuance'

export const useDetailsOfIssuance = (userId?: string) => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const _userId = userId ?? getIdFromObj(user)

  const uri = identityURL.detailsOfIssuance.get(_userId)
  const getDetailsOfIssuance = async () => {
    return await apiService.get<DetailsOfIssuance>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getDetailsOfIssuance(_userId)],
    getDetailsOfIssuance,
    { retry: false, refetchOnMount: false }
  )

  return {
    ...rest,
    data: data?.data
  }
}
