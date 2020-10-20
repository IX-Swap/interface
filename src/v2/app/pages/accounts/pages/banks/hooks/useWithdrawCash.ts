import { useAuth } from 'v2/hooks/auth/useAuth'
import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { WithdrawCashArgs } from 'v2/app/pages/accounts/types'

export const useWithdrawCash = () => {
  const { user } = useAuth()
  const { push } = useBanksRouter()
  const { apiService } = useServices()
  const { setCurrentStep } = useDepositStore()
  
  const withdrawCash = async (args: WithdrawCashArgs) => {
    const uri = `/accounts/cash/withdrawals/${user?._id ?? ''}`
    return await apiService.post(uri, args)
  }

  return useMutation(withdrawCash, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      setCurrentStep(DepositStoreStep.SUCCESS)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
