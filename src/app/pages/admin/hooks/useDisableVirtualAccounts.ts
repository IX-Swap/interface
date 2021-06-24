import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useDisableVirtualAccounts = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()

  const disableAccounts = async (accounts: string[]) => {
    return await apiService.post(virtualAccounts.disable, {
      accountIds: accounts
    })
  }

  return useMutation(disableAccounts, {
    onSuccess: () => {
      void queryCache.invalidateQueries(virtualAccountQueryKeys.listAssigned)
      void queryCache.invalidateQueries(virtualAccountQueryKeys.listUnassigned)
      void snackbarService.showSnackbar(
        'Virtual account disabled successfully!',
        'success'
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
