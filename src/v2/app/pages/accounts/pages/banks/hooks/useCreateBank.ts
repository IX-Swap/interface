import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'

export const useCreateBank = () => {
  const { banksService, snackbarService } = useServices()
  const { push } = useBanksRouter()

  return useMutation(banksService.createBank.bind(banksService), {
    onSuccess: data => {
      push('list')
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
