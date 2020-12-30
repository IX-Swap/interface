import { useQuery } from 'react-query'
import { issuanceQueryKeys } from 'config/queryKeys'
import { UseQueryData } from 'hooks/useParsedData'
import { issuanceURL } from 'config/apiURL'
import { useIssuanceQuery } from 'app/pages/issuance/hooks/useIssuanceQuery'

export interface TotalInvestors {
  total: number
  weekTotal: number
}

export const useTotalInvestors = (): UseQueryData<TotalInvestors> => {
  const { apiService, dsoId, queryEnabled } = useIssuanceQuery()
  const url = issuanceURL.dso.totalInvestors(dsoId)

  const fetchTotalInvestors = async () =>
    await apiService.get<TotalInvestors>(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.totalInvestors(dsoId)],
    fetchTotalInvestors,
    { enabled: queryEnabled }
  )

  return {
    ...rest,
    data: data?.data
  }
}
