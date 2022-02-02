import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { Enable2faFormValues } from '../types'
import { getIdFromObj } from 'helpers/strings'
import { authURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import User from 'types/user'

export const useEnable2fa = (nextStep: () => void) => {
  const { snackbarService, apiService, storageService } = useServices()
  const { user } = useAuth()
  const history = useHistory()

  const enable2fa = async ({ otp }: Enable2faFormValues) => {
    const uri = authURL.enable2fa(getIdFromObj(user), otp)
    return await apiService.post(uri, {})
  }

  return useMutation(enable2fa, {
    onSuccess: () => {
      void snackbarService.showSnackbar(
        'Google Authenticator Setup Success!',
        'success'
      )

      const userData = storageService.get<User>('user')
      if (userData !== undefined) {
        storageService.set<User>('user', {
          ...userData,
          totpConfirmed: true
        })
      }

      nextStep()
      setTimeout(() => history.push('/'), 2500)
    },
    onError: (error: string) => {
      void snackbarService.showSnackbar(error.toString(), 'error')
    }
  })
}
