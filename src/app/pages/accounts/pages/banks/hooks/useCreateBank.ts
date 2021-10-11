import { Bank } from 'types/bank'
import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import { BankFormValues } from 'app/pages/accounts/types'
import { getIdFromObj } from 'helpers/strings'
import { accountsURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'

export const useCreateBank = () => {
  const { apiService, snackbarService } = useServices()
  const history = useHistory()
  const { user } = useAuth()
  const uri = accountsURL.banks.create(getIdFromObj(user)) // `/accounts/banks/${getIdFromObj(user)}`

  const createBank = async (args: BankFormValues) => {
    return await apiService.post<Bank>(uri, args)
  }

  return useMutation(createBank, {
    onSuccess: data => {
      history.push(BanksRoute.list)
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
