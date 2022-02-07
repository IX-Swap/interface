import { useMutation } from 'react-query'
import { RequestPasswordResetArgs } from 'types/auth'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import { AuthRoute } from 'auth/router/config'
import { history } from 'config/history'

export const useRequestPasswordReset = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useHistory()
  const url = authURL.resetPassword
  const mutateFn = async (args: RequestPasswordResetArgs) => {
    return await apiService.post<{ email: string }>(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: data => {
      replace(AuthRoute.login)
      void snackbarService.showSnackbar(data.message)
      history.push(AuthRoute.successfulPasswordReset)
    }
  })
}
