import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import useAuth from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { SubFundStats } from 'types/vccDashboard'

export const useVCCFundStats = () => {
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
  const subFunds = getFilterValue('subfunds')

  const getSubFundStats = async () => {
    const uri = issuanceURL.vcc.getSubFundStats
    return await apiService.post<SubFundStats[]>(uri, {
      fundStatus: status,
      dsos: subFunds?.split(','),
      corporateId
    })
  }

  const { data, isLoading, ...rest } = useQuery(
    dsoQueryKeys.vccSubFundStats(corporateId, status ?? '', subFunds ?? ''),
    getSubFundStats,
    {
      enabled: !corporateIdentitiesIsLoading && corporateId !== undefined
    }
  )
  return {
    data: data?.data[0],
    isLoading: corporateIdentitiesIsLoading || isLoading,
    ...rest
  }
}
