import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'

export const useResetPassword = (
  email: string,
  tenantId: string,
  succesHandler: () => void
) => {
  const { apiService, snackbarService } = useServices()
  const params = useParams<{ userId: string }>()

  const queryCache = useQueryCache()

  const url = authURL.resetPassword
  const mutateFn = async () => {
    return await apiService.post(url, { email: email, tenantId: tenantId })
  }

  return useMutation(mutateFn, {
    onSuccess: async () => {
      snackbarService.showSnackbar(
        'Password reset start has been successful',
        'success'
      )
      await queryCache.invalidateQueries(
        usersQueryKeys.getUserById(params.userId)
      )
      succesHandler()
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
