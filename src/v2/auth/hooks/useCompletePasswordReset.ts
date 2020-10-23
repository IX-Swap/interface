import { useMutation } from 'react-query'
import { useAuthRouter } from 'v2/auth/router'
import { CompletePasswordResetArgs } from 'v2/types/auth'
import { useServices } from 'v2/services/useServices'

export const useCompletePasswordReset = () => {
  const { apiService, snackbarService } = useServices()
  const { push } = useAuthRouter()
  const url = '/auth/password/reset/confirm'
  const mutateFn = async (args: CompletePasswordResetArgs) => {
    return await apiService.post(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      push('login')
      void snackbarService.showSnackbar(
        'Password reset has been successful',
        'success'
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
