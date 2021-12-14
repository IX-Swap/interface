import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import useAuth from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useVCCDSO = () => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const userId = getIdFromObj(user)
  const { data: corporateIdentities, isLoading: corporateIdentitiesIsLoading } =
    useAllCorporates({
      status: 'Approved',
      userId
    })
  const corporateId = getIdFromObj(corporateIdentities.list[0])
  const { getFilterValue } = useQueryFilter()
  const status = getFilterValue('status')

  const getDSOList = async () => {
    const uri = issuanceURL.vcc.getDSOList
    return await apiService.post(uri, {
      status,
      corporateId
    })
  }

  const { data, isLoading, ...rest } = useQuery(
    dsoQueryKeys.vccDSOList(corporateId, status ?? ''),
    getDSOList,
    {
      enabled: !corporateIdentitiesIsLoading && corporateId !== undefined
    }
  )
  return {
    data: data?.data,
    isLoading: corporateIdentitiesIsLoading || isLoading,
    ...rest
  }
}
