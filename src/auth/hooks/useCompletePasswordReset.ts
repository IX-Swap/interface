import { useMutation } from 'react-query'
import { CompletePasswordResetArgs } from 'types/auth'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import { AuthRoute } from 'auth/router/config'

export const useCompletePasswordReset = () => {
  const { apiService, snackbarService } = useServices()
  const url = authURL.resetPasswordConfirm
  const { push } = useHistory()
  const mutateFn = async (args: CompletePasswordResetArgs) => {
    return await apiService.post(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      push(AuthRoute.login)
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
