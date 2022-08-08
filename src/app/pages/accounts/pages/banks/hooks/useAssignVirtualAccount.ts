import { virtualAccounts } from 'config/apiURL'
import { balanceQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { ValidCurrency } from 'helpers/types'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useAssignVirtualAccount = (callback?: () => void) => {
  const queryCache = useQueryCache()
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const authUserId = getIdFromObj(user)
  const assignVirtualAccount = async (args: {
    currency: ValidCurrency
    userId?: string
  }) => {
    return await apiService.post(virtualAccounts.assign, {
      currency: args.currency,
      userId: args.userId ?? authUserId
    })
  }
  return useMutation(assignVirtualAccount, {
    onSuccess: async () => {
      callback?.()
      snackbarService.showSnackbar(
        'Request to add a new account sent',
        'success'
      )
      await queryCache.invalidateQueries(
        balanceQueryKeys.getByUserId(authUserId)
      )
    },
    onError: async (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
      callback?.()
    }
  })
}
