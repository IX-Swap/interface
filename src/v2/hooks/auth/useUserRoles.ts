import { getUserRoles } from 'v2/helpers/acl'
import { useCachedUser } from 'v2/hooks/auth/useCachedUser'

export const useUserRoles = () => {
  const user = useCachedUser()

  return getUserRoles(user?.roles)
}
