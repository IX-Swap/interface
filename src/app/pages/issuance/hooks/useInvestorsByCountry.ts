import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from '../router'

export const useInvestorsByContry = () => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const url = `/issuance/dso/${params.dsoId}/charts/top-countries`

  const fetchInvestmentGrowth = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.investorsByCountry(params.dsoId)],
    fetchInvestmentGrowth
  )

  return {
    ...rest,
    data: data?.data
  }
}
