import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { Enable2faFormValues } from 'app/pages/security/types'
import { getIdFromObj } from 'helpers/strings'
import { authURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import User from 'types/user'

export const useEnable2fa = (
  nextStep: () => void,
  autoComplete2FA?: boolean
) => {
  const { snackbarService, apiService, storageService } = useServices()
  const { user } = useAuth()
  const history = useHistory()

  const enable2fa = async ({ otp }: Enable2faFormValues) => {
    const uri = authURL.enable2fa(getIdFromObj(user), otp)
    return await apiService.post(uri, {})
  }

  return useMutation(enable2fa, {
    onSuccess: () => {
      snackbarService.showSnackbar('Authenticator Setup Success!', 'success')

      const userData = storageService.get<User>('user')
      if (userData !== undefined) {
        storageService.set<User>('user', {
          ...userData,
          totpConfirmed: true
        })
      }

      nextStep()
      if (autoComplete2FA !== undefined && autoComplete2FA) {
        setTimeout(() => history.push('/'), 2500)
      }
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
