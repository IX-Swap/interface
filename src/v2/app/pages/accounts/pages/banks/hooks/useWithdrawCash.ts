import { useMutation } from 'react-query'
import { useServices } from 'v2/hooks/useServices'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { WithdrawCashArgs } from 'v2/app/pages/accounts/types'
import { getIdFromObj } from 'v2/helpers/strings'

export const useWithdrawCash = () => {
  const { user } = useAuth()
  const { setCurrentStep } = useDepositStore()
  const { apiService, snackbarService } = useServices()
  const uri = `/accounts/cash/withdrawals/${getIdFromObj(user)}`

  const withdrawCash = async (args: WithdrawCashArgs) => {
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
