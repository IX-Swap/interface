import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useSecurityRouter } from '../../../routes'

export const useChangePassword = () => {
  const { changePasswordService, snackbarService } = useServices()
  const { push } = useSecurityRouter()

  return useMutation(
    changePasswordService.changePassword.bind(changePasswordService),
    {
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
    }
  )
}
