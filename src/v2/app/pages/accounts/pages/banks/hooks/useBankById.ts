import { UseQueryData } from 'v2/hooks/useParsedData'
import { useServices } from 'v2/services/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Bank } from 'v2/types/bank'

export const USER_BANK_BY_ID_KEY = 'bank'

export interface UseBankByIdArgs {
  bankId: string
  ownerId?: string
}

export const useBankById = (args: UseBankByIdArgs): UseQueryData<Bank> => {
  const { bankId, ownerId } = args
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = ownerId ?? user?._id ?? ''
  const uri = `accounts/banks/${userId}/${bankId}`
  const getBank = async () => await apiService.get<Bank>(uri)
  const { data, ...rest } = useQuery(
    [USER_BANK_BY_ID_KEY, userId, bankId],
    getBank
  )

  return {
    ...rest,
    data: data?.data
  }
}
