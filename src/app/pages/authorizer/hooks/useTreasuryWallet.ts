import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export interface TreasuryWallet {
  balance: string
  ownerBalance?: string
}

export const useTreasuryWallet = (networkCode?: string, dsoId?: string) => {
  const { apiService } = useServices()
  const getWallet = async () => {
    return await apiService.get<TreasuryWallet>(
      `/blockchain/balance/${networkCode ?? ''}`
    )
  }

  const { data, ...rest } = useQuery([networkCode, dsoId], getWallet)
  return {
    data: data?.data,
    ...rest
  }
}
