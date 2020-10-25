import { useServices } from 'v2/hooks/useServices'
import { useMutation } from 'react-query'
import { useSecurityRouter } from 'v2/app/pages/security/router'
import { ChangePasswordFormValues } from '../types'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getIdFromObj } from 'v2/helpers/strings'

export const useChangePassword = () => {
  const { apiService, snackbarService } = useServices()
  const { push } = useSecurityRouter()
  const { user } = useAuth()

  const changePassword = async (args: ChangePasswordFormValues) => {
    const { confirmPassword, ...payload } = args
    const uri = `/auth/password/change/${getIdFromObj(user)}`

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
