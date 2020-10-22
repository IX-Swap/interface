import { Bank } from 'v2/types/bank'
import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { CreateBankArgs } from 'v2/app/pages/accounts/types'
import { getIdFromObj } from 'v2/helpers/strings'

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
