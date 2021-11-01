import { accountsURL } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export interface VirtualAccountInfo {
  _id: string
  currency: string
  balance: number
}

export interface BalancesInfo {
  availableBalance: number
  primaryInvestmentBalance: number
  secondaryInvestmentBalance: number
  totalAssetBalance: number
  withdrawalAddressCount: number
}

export interface MarketInfo {
  equityAmount: number
  hybridAmount: number
  debtAmount: number
  fundAmount: number
  totalAmount: number
}

export interface AccountPortfolio {
  accounts: VirtualAccountInfo[]
  balances: BalancesInfo
  primaryMarket: MarketInfo
  secondaryMarket: MarketInfo
}

export const useGetPortfolios = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()

  const getPortfolios = async () => {
    const uri = accountsURL.getPortfolios(userId)
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
