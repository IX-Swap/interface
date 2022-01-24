import { accountsURL } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { AccountPortfolio } from 'types/portfolio'

export const useGetPortfolios = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()

  const getPortfolios = async () => {
    const uri = accountsURL.dashboard.getPortfolios(userId)
    return await apiService.get<AccountPortfolio>(uri)
  }

  const { data, ...rest } = useQuery(
    [virtualAccountQueryKeys.getPortfolios, { userId }],
    getPortfolios
  )

  return {
    ...rest,
    data: data?.data
  }
}
