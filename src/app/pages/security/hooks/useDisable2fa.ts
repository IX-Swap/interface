import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { USER_QUERY_KEY } from 'auth/hooks/useUser'
import { authURL } from 'config/apiURL'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export const useDisable2fa = (handleSuccess?: () => void) => {
  const { apiService, snackbarService, storageService } = useServices()

  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const mutateFn = async () => {
    return await apiService.post(authURL.disable2fa(userId), {})
  }

  return useMutation(mutateFn, {
    onSuccess: data => {
      if (handleSuccess !== undefined) {
        handleSuccess()
      }
      void snackbarService.showSnackbar(data.message, 'success')
      storageService.set(USER_QUERY_KEY, { ...user, enable2Fa: false })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
