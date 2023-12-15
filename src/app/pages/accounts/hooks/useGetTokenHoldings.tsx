import { accountsURL } from 'config/apiURL'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useGetTokenHoldings = (type = 'Security') => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const getCustody = async () => {
    return await apiService.post(accountsURL.ledger.getTokenHoldings, {
      skip: 0,
      limit: 500,
      type
    })
  }

  const { data, ...rest } = useQuery(
    [digitalSecuritiesQueryKeys.custody(userId), type],
    getCustody
  )

  return {
    data: data?.data[0].documents,
    ...rest
  }
}
