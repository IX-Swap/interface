import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { DigitalSecurityOffering } from 'types/dso'
import { getIdFromObj } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { isValidDSOId } from 'helpers/isValidDSOId'

export const useDSOById = (dsoId: string, issuerId?: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = issuanceURL.dso.getById(issuerId ?? getIdFromObj(user), dsoId)
  const fetchDSO = async () =>
    await apiService.get<DigitalSecurityOffering>(url)
  const { data, ...rest } = useQuery(
    [investQueryKeys.getDSOById, dsoId],
    fetchDSO,
    { enabled: isValidDSOId(dsoId) }
  )

  return {
    ...rest,
    data: data?.data
  }
}
