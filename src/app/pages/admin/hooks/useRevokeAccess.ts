import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { useAdminRouter } from 'app/pages/admin/router'
import { usersQueryKeys } from 'config/queryKeys'

export const useRevokeAccess = () => {
  const { apiService, snackbarService } = useServices()
  const {
    params: { userId }
  } = useAdminRouter()
  const queryCache = useQueryCache()

  const url = authURL.revokeAccess
  const mutateFn = async (sessionId?: string) => {
    return await apiService.delete(url, {
      userId: userId,
      sessionId: sessionId
    })
  }

  return useMutation(mutateFn, {
    onSuccess: async () => {
      snackbarService.showSnackbar(
        'Revoke access had been successful',
        'success'
      )
      await queryCache.invalidateQueries(usersQueryKeys.getUserById(userId))
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
