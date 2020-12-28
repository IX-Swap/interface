import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from '../router'
import { issuanceURL } from 'config/apiURL'

export const useInvestmentGrowth = () => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const url = issuanceURL.dso.investmentGrowth(params.dsoId)

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
