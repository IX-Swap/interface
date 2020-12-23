import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { UseQueryData } from 'hooks/useParsedData'
import { issuanceURL } from 'config/apiURL'

export interface TotalInvestors {
  total: number
  weekTotal: number
}

export const useTotalInvestors = (): UseQueryData<TotalInvestors> => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const url = issuanceURL.dso.totalInvestors(params.dsoId)

  const fetchTotalInvestors = async () =>
    await apiService.get<TotalInvestors>(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.totalInvestors(params.dsoId)],
    fetchTotalInvestors
  )

  return {
    ...rest,
    data: data?.data
  }
}
