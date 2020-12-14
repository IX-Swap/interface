import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'

export const useInvestmentGrowth = () => {
  const { apiService } = useServices()
  const url = `/issuance/dso/th1s1sm0ck1d/charts/investment-growth`

  const fetchInvestmentGrowth = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.investmentGrowth],
    fetchInvestmentGrowth
  )

  return {
    ...rest,
    data: data?.data
  }
}
