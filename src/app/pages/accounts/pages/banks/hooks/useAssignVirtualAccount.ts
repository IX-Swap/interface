import { getIdFromObj } from 'helpers/strings'
import { ValidCurrency } from 'helpers/types'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'

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
      void snackbarService.showSnackbar(
        'Account has been assigned successfully.',
        'success'
      )
      await queryCache.invalidateQueries(virtualAccountQueryKeys.getByUserId)
    },
    onError: async (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callback?.()
    }
  })
}
