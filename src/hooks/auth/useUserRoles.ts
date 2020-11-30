import { getUserRoles } from 'helpers/acl'
import { useCachedUser } from 'hooks/auth/useCachedUser'

export const useUserRoles = () => {
  const user = useCachedUser()

  return getUserRoles(user?.roles)
}
