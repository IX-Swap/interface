import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from '../router'

export const useInvestmentGrowth = () => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const url = `/issuance/dso/${params.dsoId}/charts/investment-growth`

  const fetchInvestmentGrowth = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.investmentGrowth(params.dsoId)],
    fetchInvestmentGrowth
  )

  return {
    ...rest,
    data: data?.data
  }
}
