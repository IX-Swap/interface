import { useMutation } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/hooks/useServices'
import { WithdrawDSArgs } from 'v2/app/pages/accounts/types'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'
import { getIdFromObj } from 'v2/helpers/strings'

export const useWithdrawDS = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const { setCurrentStep } = useDepositStore()
  const uri = `/accounts/security/withdrawals/${getIdFromObj(user)}`

  const withdrawDS = async (args: WithdrawDSArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(withdrawDS, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      setCurrentStep(DepositStoreStep.SUCCESS)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
