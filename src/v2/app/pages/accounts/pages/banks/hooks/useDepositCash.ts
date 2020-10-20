import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useDepositStore } from '../context'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'

export const useDepositCash = () => {
  const { setCurrentStep } = useDepositStore()
  const { banksService, snackbarService } = useServices()

  return useMutation(banksService.depositCash.bind(banksService), {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      setCurrentStep(DepositStoreStep.SUCCESS)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
