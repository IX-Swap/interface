import { useAuth } from 'v2/hooks/auth/useAuth'
import { getUserRoles } from 'v2/helpers/acl'

export const useUserRoles = () => {
  const { user } = useAuth()
  return getUserRoles(user?.roles)
}
