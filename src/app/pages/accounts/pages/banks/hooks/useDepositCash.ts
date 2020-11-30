import { useMutation, useQueryCache } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useDepositStore } from 'app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'app/pages/accounts/pages/banks/context/store'
import { DepositCashArgs } from 'app/pages/accounts/types'
import { getIdFromObj } from 'helpers/strings'

export const useDepositCash = () => {
  const { user } = useAuth()
  const queryCache = useQueryCache()
  const { setCurrentStep } = useDepositStore()
  const { apiService, snackbarService } = useServices()
  const userId = getIdFromObj(user)
  const uri = `/accounts/cash/deposits/${getIdFromObj(user)}`

  const depositCash = async (args: DepositCashArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(depositCash, {
    onSuccess: data => {
      void queryCache.invalidateQueries(`cash-deposits-${userId}`)
      void snackbarService.showSnackbar(data.message, 'success')
      setCurrentStep(DepositStoreStep.SUCCESS)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
