import { Bank } from 'v2/types/bank'
import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { CreateBankArgs } from 'v2/app/pages/accounts/types'

export const useCreateBank = () => {
  const { apiService, snackbarService } = useServices()
  const { push } = useBanksRouter()
  const { user } = useAuth()

  const createBank = async (args: CreateBankArgs) => {
    const uri = `/accounts/banks/${user?._id ?? ''}`
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
