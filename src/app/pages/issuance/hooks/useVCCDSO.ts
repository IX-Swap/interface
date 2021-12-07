import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import useAuth from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'

export const useVCCDSO = () => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const userId = getIdFromObj(user)
  const { data: corporateIdentities, isLoading: corporateIdentitiesIsLoading } =
    useAllCorporates({
      userId
    })
  const corporateID = getIdFromObj(corporateIdentities.list[0])

  const getDSOList = async () => {
    const uri = issuanceURL.vcc.getDSOList(corporateID)
    return await apiService.get(uri + '?status=Open')
  }

  const { data, isLoading, ...rest } = useQuery(
    dsoQueryKeys.vccDSOList(corporateID),
    getDSOList,
    {
      enabled: !corporateIdentitiesIsLoading && corporateID !== undefined
    }
  )
  return {
    data: data?.data,
    isLoading: corporateIdentitiesIsLoading || isLoading,
    ...rest
  }
}
