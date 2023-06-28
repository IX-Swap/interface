import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export interface SetRolesArgs {
  onSuccess?: Function
  onError?: Function
}
export const useSetRoles = (args: SetRolesArgs) => {
  const { onSuccess, onError } = args
  const { adminService } = useServices()
  const { snackbarService } = useServices()

  return useMutation(adminService.setUserRole, {
    onSuccess: () => {
      onSuccess?.()
      window.location.reload()
    },
    onError: (error: any) => {
      onError?.(error)
      void snackbarService.showSnackbar(
        error.message ?? 'Something went wrong',
        'error'
      )
    }
  })
}
