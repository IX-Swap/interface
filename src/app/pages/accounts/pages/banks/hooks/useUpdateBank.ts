import { Bank } from 'types/bank'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useBanksRouter } from 'app/pages/accounts/pages/banks/router'
import { UpdateBankArgs } from 'app/pages/accounts/types'
import { getIdFromObj } from 'helpers/strings'
import { accountsURL } from 'config/apiURL'

export const useUpdateBank = () => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const { push } = useBanksRouter()

  const updateBank = async (args: UpdateBankArgs) => {
    const { bankId, ...bank } = args
    const uri = accountsURL.banks.update(getIdFromObj(user), bankId)
    return await apiService.put<Bank>(uri, bank)
  }

  return useMutation(updateBank, {
    onSuccess: () => {
      push('list')
    }
  })
}
