import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { getIdFromObj } from 'helpers/strings'
import { dsoQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { Closure } from 'app/pages/authorizer/pages/DealClosures/DealClosures'

export const useClosure = (closureId: string, issuerId?: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = issuanceURL.dso.closure(closureId, issuerId ?? getIdFromObj(user))
  const fetchClosure = async () => await apiService.get<Closure>(url)
  const { data, ...rest } = useQuery(
    dsoQueryKeys.closure(closureId),
    fetchClosure
  )

  return {
    ...rest,
    data: data?.data
  }
}
