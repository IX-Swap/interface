import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useLogout } from 'auth/hooks/useLogout'
import { useAuth } from 'hooks/auth/useAuth'
import { Enable2faFormValues } from '../types'
import { getIdFromObj } from 'helpers/strings'
import { authURL } from 'config/apiURL'

export const useEnable2fa = () => {
  const { snackbarService, apiService } = useServices()
  const logout = useLogout()
  const { user } = useAuth()

  const enable2fa = async ({ otp }: Enable2faFormValues) => {
    const uri = authURL.enable2fa(getIdFromObj(user), otp)
    return await apiService.post(uri, {})
  }

  return useMutation(enable2fa, {
    onSuccess: () => {
      void snackbarService.showSnackbar(
        'Google Authenticator Setup Success! You will be redirected to Login page.',
        'success'
      )

      setTimeout(() => logout(), 2500)
    },
    onError: (error: string) => {
      void snackbarService.showSnackbar(error.toString(), 'error')
    }
  })
}
