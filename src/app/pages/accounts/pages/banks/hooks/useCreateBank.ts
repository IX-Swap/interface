import { Bank } from 'types/bank'
import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { useBanksRouter } from 'app/pages/accounts/pages/banks/router'
import { useAuth } from 'hooks/auth/useAuth'
import { CreateBankArgs } from 'app/pages/accounts/types'
import { getIdFromObj } from 'helpers/strings'

export const useCreateBank = () => {
  const { apiService, snackbarService } = useServices()
  const { push } = useBanksRouter()
  const { user } = useAuth()
  const uri = `/accounts/banks/${getIdFromObj(user)}`

  const createBank = async (args: CreateBankArgs) => {
    return await apiService.post<Bank>(uri, args)
  }

  return useMutation(createBank, {
    onSuccess: data => {
      push('list')
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
