import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { DigitalSecurityOffering } from 'types/dso'
import { isEmptyString } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { isValidDSOId } from 'helpers/isValidDSOId'

export const useDSOById = (dsoId?: string, issuerId?: string) => {
  const { apiService } = useServices()

  const url = issuanceURL.dso.getById(issuerId, dsoId)
  const fetchDSO = async () =>
    await apiService.get<DigitalSecurityOffering>(url)
  const { data, ...rest } = useQuery(
    investQueryKeys.getDSOById(dsoId, issuerId),
    fetchDSO,
    {
      enabled: isValidDSOId(dsoId) && !isEmptyString(issuerId)
    }
  )

  return {
    ...rest,
    data: data?.data
  }
}
