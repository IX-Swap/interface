import { Bank } from 'v2/types/bank'
import { useMutation } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { UpdateBankArgs } from 'v2/app/pages/accounts/types'

export const useUpdateBank = () => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const { push } = useBanksRouter()

  const updateBank = async (args: UpdateBankArgs) => {
    const { bankId, ...bank } = args
    const uri = `/accounts/banks/${user?._id ?? ''}/${bankId}`
    return await apiService.put<Bank>(uri, bank)
  }

  return useMutation(updateBank, {
    onSuccess: () => push('list')
  })
}
