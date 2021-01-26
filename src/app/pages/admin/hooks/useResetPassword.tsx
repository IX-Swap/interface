import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { useAdminRouter } from 'app/pages/admin/router'
import { usersQueryKeys } from 'config/queryKeys'

export const useResetPassword = (email: string, succesHandler: () => void) => {
  const { apiService, snackbarService } = useServices()
  const { params } = useAdminRouter()

  const queryCache = useQueryCache()

  const url = authURL.resetPassword
  const mutateFn = async () => {
    return await apiService.post(url, { email: email })
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
