import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { VirtualAccount } from 'types/virtualAccount'

export const useUnassignVirtualAccount = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()

  const unassignVirtualAccount = async (account: VirtualAccount) => {
    return await apiService.patch(
      virtualAccounts.unassign(getIdFromObj(account)),
      {}
    )
  }

  return useMutation(unassignVirtualAccount, {
    onSuccess: () => {
      void snackbarService.showSnackbar(
        'Virtual account unassigned successfully!',
        'success'
      )
      void queryCache.invalidateQueries(virtualAccountQueryKeys.listAssigned)
      void queryCache.invalidateQueries(virtualAccountQueryKeys.listUnassigned)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
