import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useSecurityRouter } from 'app/pages/security/router'
import { ChangePasswordFormValues } from '../types'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { authURL } from 'config/apiURL'

export const useChangePassword = () => {
  const { apiService, snackbarService } = useServices()
  const { push } = useSecurityRouter()
  const { user } = useAuth()

  const changePassword = async (args: ChangePasswordFormValues) => {
    const { confirmPassword, ...payload } = args
    const uri = authURL.changePassword(getIdFromObj(user))

    return await apiService.post<any>(uri, payload)
  }

  return useMutation(changePassword, {
    onSuccess: () => {
      push('landing')
      void snackbarService.showSnackbar(
        'Successfully changed password',
        'success'
      )
    },
    onError: (error: string) => {
      void snackbarService.showSnackbar(error.toString(), 'error')
    }
  })
}
