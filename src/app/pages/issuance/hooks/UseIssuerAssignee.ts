import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'

export const useIssuerAssignee = () => {
  const { apiService } = useServices()
  const uri = issuanceURL.dso.getIssuerList

  const getIssuerList = async () => {
    return await apiService.get(uri, {})
  }
  const { data, ...queryResult } = useQuery(
    homeQueryKeys.getTopIssuers,
    getIssuerList
  )

  return {
    ...queryResult,
    data: data?.data
  }
}
