import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { TwoFaData, Update2faFormValues } from '../types'
import { getIdFromObj } from 'helpers/strings'
import { authURL } from 'config/apiURL'
import User from 'types/user'

export const useUpdate2fa = (
  handleSuccessRequest: (twoFaData: TwoFaData) => void
) => {
  const { snackbarService, apiService, storageService } = useServices()
  const { user } = useAuth()

  const update2fa = async ({ otp, emailCode }: Update2faFormValues) => {
    const uri = authURL.remove2fa(getIdFromObj(user))
    return await apiService.post(uri, { otp, emailCode })
  }

  return useMutation(update2fa, {
    onSuccess: data => {
      void snackbarService.showSnackbar(
        'Authenticator has been successfully removed!',
        'success'
      )

      const userData = storageService.get<User>('user')
      if (userData !== undefined) {
        storageService.set<User>('user', {
          ...userData,
          totpConfirmed: false
        })
      }

      handleSuccessRequest(data.data)
    },
    onError: (error: string) => {
      void snackbarService.showSnackbar(error.toString(), 'error')
    }
  })
}
