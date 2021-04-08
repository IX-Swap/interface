import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export interface SetRolesArgs {
  onSuccess?: Function
  onError?: Function
}
export const useSetRoles = (args: SetRolesArgs) => {
  const { onSuccess, onError } = args
  const { adminService } = useServices()

  return useMutation(adminService.setUserRole, {
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (error: any) => {
      onError?.(error)
    }
  })
}
