import { Bank } from 'types/bank'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { UpdateBankArgs } from 'app/pages/accounts/types'
import { getIdFromObj } from 'helpers/strings'
import { accountsURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'

export const useUpdateBank = (callback?: () => void) => {
  const { user } = useAuth()
  const { apiService, snackbarService } = useServices()
  const history = useHistory()

  const updateBank = async (args: UpdateBankArgs) => {
    const { bankId, ...bank } = args
    const uri = accountsURL.banks.update(getIdFromObj(user), bankId)
    return await apiService.put<Bank>(uri, bank)
  }

  return useMutation(updateBank, {
    onSuccess: () => {
      history.push(BanksRoute.list)
    },
    onError: async (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
      callback?.()
    }
  })
}
