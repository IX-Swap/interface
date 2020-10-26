import { useMutation } from 'react-query'
import { RequestPasswordResetArgs } from 'v2/types/auth'
import { useServices } from 'v2/hooks/useServices'
import { useAuthRouter } from 'v2/auth/router'

export const useRequestPasswordReset = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useAuthRouter()
  const url = '/auth/password/reset/start'
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
