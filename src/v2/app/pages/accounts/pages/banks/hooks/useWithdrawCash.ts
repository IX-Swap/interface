import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'

export const useWithdrawCash = () => {
  const { setCurrentStep } = useDepositStore()
  const { banksService, snackbarService } = useServices()

  return useMutation(banksService.withdrawCash.bind(banksService), {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      setCurrentStep(DepositStoreStep.SUCCESS)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
