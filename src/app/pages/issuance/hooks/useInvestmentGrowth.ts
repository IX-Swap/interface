import { useQuery } from 'react-query'
import { issuanceQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { useIssuanceQuery } from 'app/pages/issuance/hooks/useIssuanceQuery'

export const useInvestmentGrowth = () => {
  const { apiService, dsoId, queryEnabled } = useIssuanceQuery()
  const url = issuanceURL.dso.investmentGrowth(dsoId)

  const fetchInvestmentGrowth = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.investmentGrowth(dsoId)],
    fetchInvestmentGrowth,
    { enabled: queryEnabled }
  )

  return {
    ...rest,
    data: data?.data
  }
}
