import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { ChangePasswordFormValues } from '../types'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { authURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'

export const useChangePassword = () => {
  const { apiService, snackbarService } = useServices()
  const { push } = useHistory()
  const { user } = useAuth()

  const changePassword = async (args: ChangePasswordFormValues) => {
    const { confirmPassword, ...payload } = args
    const uri = authURL.changePassword(getIdFromObj(user))

    return await apiService.post<any>(uri, payload)
  }

  return useMutation(changePassword, {
    onSuccess: () => {
      push(SecurityRoute.landing)
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
