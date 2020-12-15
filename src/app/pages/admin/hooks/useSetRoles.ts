import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export const useSetRoles = () => {
  const { adminService } = useServices()

  return useMutation(adminService.setUserRole.bind(adminService))
}
