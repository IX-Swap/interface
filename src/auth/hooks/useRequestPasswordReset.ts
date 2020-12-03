import { useMutation } from 'react-query'
import { RequestPasswordResetArgs } from 'types/auth'
import { useServices } from 'hooks/useServices'
import { useAuthRouter } from 'auth/router'
import { authURL } from 'config/apiURL'

export const useRequestPasswordReset = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useAuthRouter()
  const url = authURL.resetPassword
  const mutateFn = async (args: RequestPasswordResetArgs) => {
    return await apiService.post<{ email: string }>(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: data => {
      void snackbarService.showSnackbar(
        `Email has been sent to ${data.data.email}`
      )
      replace('login')
    }
  })
}
