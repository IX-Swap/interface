import { useMutation } from 'react-query'
import { RequestPasswordResetArgs } from 'types/auth'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import { AuthRoute } from 'auth/router/config'

export const useResendVerificationEmail = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useHistory()
  const url = authURL.sendVerificationEmail
  const mutateFn = async (args: RequestPasswordResetArgs) => {
    return await apiService.post<{ email: string; tenantId: string }>(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      replace(AuthRoute.login)
      snackbarService.showSnackbar(
        'Verification link has been sent to your email.'
      )
    }
  })
}
