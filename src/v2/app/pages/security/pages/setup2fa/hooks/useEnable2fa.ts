import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useLogout } from 'v2/auth/hooks/useLogout'

export const useEnable2fa = () => {
  const { setup2faService, snackbarService } = useServices()
  const logout = useLogout()

  return useMutation(setup2faService.enable2fa.bind(setup2faService), {
    onSuccess: e => {
      void snackbarService.showSnackbar(
        'Google Authenticator Setup Success! You will be redirected to Login page.',
        'success'
      )
      logout()
    },
    onError: (error: string) => {
      void snackbarService.showSnackbar(error.toString(), 'error')
    }
  })
}
