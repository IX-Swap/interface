import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { DepositStoreStep } from 'app/pages/accounts/pages/banks/context/store'
import { useDepositStore } from 'app/pages/accounts/pages/banks/context'
import { useAuth } from 'hooks/auth/useAuth'
import { WithdrawCashArgs } from 'app/pages/accounts/types'
import { getIdFromObj } from 'helpers/strings'
import { accountsURL } from 'config/apiURL'
import { cashWithdrawalsQueryKeys } from 'config/queryKeys'

export const useWithdrawCash = () => {
  const { user } = useAuth()
  const { setCurrentStep } = useDepositStore()
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const uri = accountsURL.cashWithdrawals.create(getIdFromObj(user))

  const withdrawCash = async (args: WithdrawCashArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(withdrawCash, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(
        cashWithdrawalsQueryKeys.getByUserId(getIdFromObj(user))
      )
      setCurrentStep(DepositStoreStep.SUCCESS)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
