import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'

export const useRevokeAccess = () => {
  const { apiService, snackbarService } = useServices()
  const params = useParams<{ userId: string }>()
  const queryCache = useQueryCache()

  const url = authURL.revokeAccess
  const mutateFn = async (sessionId?: string) => {
    return await apiService.delete(url, {
      userId: params.userId,
      sessionId: sessionId
    })
  }

  return useMutation(mutateFn, {
    onSuccess: async () => {
      snackbarService.showSnackbar(
        'Revoke access had been successful',
        'success'
      )
      await queryCache.invalidateQueries(
        usersQueryKeys.getUserById(params.userId)
      )
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
