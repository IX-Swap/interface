import { Bank } from 'v2/types/bank'
import { useMutation } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/hooks/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { UpdateBankArgs } from 'v2/app/pages/accounts/types'
import { getIdFromObj } from 'v2/helpers/strings'

export const useUpdateBank = () => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const { push } = useBanksRouter()

  const updateBank = async (args: UpdateBankArgs) => {
    const { bankId, ...bank } = args
    const uri = `/accounts/banks/${getIdFromObj(user)}/${bankId}`
    return await apiService.put<Bank>(uri, bank)
  }

  return useMutation(updateBank, {
    onSuccess: () => {
      push('list')
    }
  })
}
