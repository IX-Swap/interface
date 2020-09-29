import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useLogout } from 'v2/auth/hooks/useLogout'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Enable2faFormValues } from '../types'

export const useEnable2fa = () => {
  const { snackbarService, apiService } = useServices()
  const logout = useLogout()
  const { user } = useAuth()

  const enable2fa = async ({ otp }: Enable2faFormValues) => {
    const uri = `/auth/2fa/setup/${user?._id ?? ''}/confirm/${otp}`
    return await apiService.post(uri, {})
  }

  return useMutation(enable2fa, {
    onSuccess: () => {
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
