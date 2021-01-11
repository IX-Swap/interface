import { useQuery } from 'react-query'
import { issuanceQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { useIssuanceQuery } from 'app/pages/issuance/hooks/useIssuanceQuery'

export const useInvestorsByCountry = () => {
  const { apiService, dsoId, queryEnabled } = useIssuanceQuery()
  const url = issuanceURL.dso.topCountries(dsoId)

  const fetchInvestorsByCountry = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.investorsByCountry(dsoId)],
    fetchInvestorsByCountry,
    { enabled: queryEnabled }
  )

  return {
    ...rest,
    data: data?.data
  }
}
