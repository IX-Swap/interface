import { UseQueryData } from 'v2/hooks/useParsedData'
import { useServices } from 'v2/hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Bank } from 'v2/types/bank'
import { getIdFromObj } from 'v2/helpers/strings'

export const USER_BANK_BY_ID_KEY = 'bank'

export interface UseBankByIdArgs {
  bankId: string
  ownerId?: string
}

export const useBankById = (args: UseBankByIdArgs): UseQueryData<Bank> => {
  const { bankId, ownerId } = args
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = ownerId ?? getIdFromObj(user)
  const uri = `accounts/banks/${userId}/${bankId}`

  const getBank = async () => await apiService.get<Bank>(uri)
  const { data, ...rest } = useQuery(
    [USER_BANK_BY_ID_KEY, userId, bankId],
    getBank,
    { enabled: (bankId ?? '') !== '' }
  )

  return {
    ...rest,
    data: data?.data
  }
}
