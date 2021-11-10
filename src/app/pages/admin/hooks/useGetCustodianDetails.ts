import { useServices } from 'hooks/useServices'
import { custodyAccounts } from 'config/apiURL'
import { useQuery } from 'react-query'
import { custodyAccountsQueryKeys } from 'config/queryKeys'
import { CustodyDetails } from 'types/custodyAccount'

export const useGetCustodianDetails = (accountId: string) => {
  const { apiService } = useServices()
  const url = custodyAccounts.getCustodianDetails(accountId)
  const fetchCustodianDetails = async () => {
    return await apiService.get<CustodyDetails>(url)
  }

  const { data, ...rest } = useQuery(
    [custodyAccountsQueryKeys.getCustodianDetails, accountId],
    fetchCustodianDetails
  )

  return {
    ...rest,
    data: data?.data
  }
}
