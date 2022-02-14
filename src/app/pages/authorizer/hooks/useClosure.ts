import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { getIdFromObj, isEmptyString } from 'helpers/strings'
import { dsoQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { Closure } from 'app/pages/authorizer/pages/DealClosures/DealClosures'

export const useClosure = (closureId?: string, issuerId?: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()

  const userId = issuerId ?? getIdFromObj(user)
  const url = issuanceURL.dso.closure(closureId, userId)
  const fetchClosure = async () => await apiService.get<Closure>(url)

  const { data, ...rest } = useQuery(
    dsoQueryKeys.closure(closureId),
    fetchClosure,
    {
      enabled: !isEmptyString(closureId) && !isEmptyString(userId)
    }
  )

  return {
    ...rest,
    data: data?.data
  }
}
