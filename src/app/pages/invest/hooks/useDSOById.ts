import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { DigitalSecurityOffering } from 'types/dso'
import { getIdFromObj } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { isValidDSOId } from 'helpers/isValidDSOId'

export const useDSOById = (dsoId?: string, issuerId?: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const userId = issuerId ?? getIdFromObj(user)

  const url = issuanceURL.dso.getById(userId, dsoId)
  const fetchDSO = async () =>
    await apiService.get<DigitalSecurityOffering>(url)
  const { data, ...rest } = useQuery(
    investQueryKeys.getDSOById(dsoId, userId),
    fetchDSO,
    { enabled: isValidDSOId(dsoId) && !!userId, cacheTime: 0 }
  )

  return {
    ...rest,
    data: data?.data
  }
}
