import { useServices } from 'hooks/useServices'
import { accountsURL } from 'config/apiURL'
import { useMutation } from 'react-query'

export const useCustodyWithdrawal = () => {
  const { apiService, snackbarService } = useServices()
  const withdraw = async (args: any) => {
    return await apiService.post(
      accountsURL.dsWithdrawals.createCustodyWithdrawal,
      args
    )
  }

  return useMutation(withdraw, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(
        error.message ?? 'Something went wrong',
        'error'
      )
    }
  })
}
