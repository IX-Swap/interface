import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { DigitalSecurityOffering } from 'types/dso'
import { getIdFromObj } from 'helpers/strings'
import { invest } from 'config/queryKeys'

export const useDSOById = (dsoId: string, issuerId?: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = `/issuance/dso/${issuerId ?? getIdFromObj(user)}/${dsoId}`
  const fetchDSO = async () =>
    await apiService.get<DigitalSecurityOffering>(url)
  const { data, ...rest } = useQuery([invest.getDSOById, dsoId], fetchDSO)

  return {
    ...rest,
    data: data?.data
  }
}
