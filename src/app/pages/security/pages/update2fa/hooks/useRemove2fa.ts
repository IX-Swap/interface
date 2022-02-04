import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { TwoFaData, Remove2faFormValues } from 'app/pages/security/types'
import { getIdFromObj } from 'helpers/strings'
import { authURL } from 'config/apiURL'
import User from 'types/user'

export const useRemove2fa = (
  handleSuccessRequest: (twoFaData: TwoFaData) => void
) => {
  const { snackbarService, apiService, storageService } = useServices()
  const { user } = useAuth()

  const remove2fa = async ({ otp, emailCode }: Remove2faFormValues) => {
    const uri = authURL.remove2fa(getIdFromObj(user))
    return await apiService.post(uri, { otp, emailCode })
  }

  return useMutation(remove2fa, {
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
