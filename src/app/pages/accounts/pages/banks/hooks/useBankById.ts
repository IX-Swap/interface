import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { Bank } from 'types/bank'
import { getIdFromObj, isEmptyString } from 'helpers/strings'
import { banksQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

export interface UseBankByIdArgs {
  bankId?: string
  ownerId?: string
}

export const useBankById = (args: UseBankByIdArgs): UseQueryData<Bank> => {
  const { bankId, ownerId } = args
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = ownerId ?? getIdFromObj(user)
  const uri = accountsURL.banks.getById(userId, bankId)

  const getBank = async () => await apiService.get<Bank>(uri)
  const { data, ...rest } = useQuery(
    [banksQueryKeys.getById, userId, bankId],
    getBank,
    { enabled: !isEmptyString(bankId) && !isEmptyString(userId) }
  )

  return {
    ...rest,
    data: data?.data
  }
}
