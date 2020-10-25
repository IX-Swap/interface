import { useQuery } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/hooks/useServices'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { getIdFromObj } from 'v2/helpers/strings'

export const USE_DSO_BY_ID_QUERY_KEY = 'dsoById'

export const useDSOById = (dsoId: string, issuerId?: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = `/issuance/dso/${issuerId ?? getIdFromObj(user)}/${dsoId}`
  const fetchDSO = async () =>
    await apiService.get<DigitalSecurityOffering>(url)
  const { data, ...rest } = useQuery([USE_DSO_BY_ID_QUERY_KEY, dsoId], fetchDSO)

  return {
    ...rest,
    data: data?.data
  }
}
