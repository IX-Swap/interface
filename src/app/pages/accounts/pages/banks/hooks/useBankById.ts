import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { Bank } from 'types/bank'
import { getIdFromObj } from 'helpers/strings'
import { banks } from 'config/queryKeys'
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
    [banks.getById, userId, bankId],
    getBank,
    { enabled: (bankId ?? '') !== '' }
  )

  return {
    ...rest,
    data: data?.data
  }
}
