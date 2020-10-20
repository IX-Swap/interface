import { useMutation } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/services/useServices'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'
import { DepositCashArgs } from 'v2/app/pages/accounts/types'

export const useDepositCash = () => {
  const { user } = useAuth()
  const { setCurrentStep } = useDepositStore()
  const { apiService, snackbarService } = useServices()
  const uri = `/accounts/cash/deposits/${user?._id ?? ''}`

  const depositCash = async (args: DepositCashArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(depositCash, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      setCurrentStep(DepositStoreStep.SUCCESS)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
