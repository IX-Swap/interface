import { includes } from 'lodash'
import { useCachedUser } from 'v2/hooks/auth/useCachedUser'

export enum AppRole {
  ADMIN = 'admin',
  AUTHORIZER = 'authorizer',
  ISSUER = 'issuer',
  USER = 'user',
  ACCREDITED = 'accredited'
}

export const getUserRoles = (roles?: string) => {
  if (roles === undefined) {
    return []
  }

  return roles.split(',') as AppRole[]
}

export const hasRole = (roles: string, roleToCheck: AppRole) => {
  const rolesList = getUserRoles(roles)

  return includes(rolesList, roleToCheck)
}

export const useIsAdmin = () => {
  const user = useCachedUser()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.ADMIN)
}

export const useIsAuthorizer = () => {
  const user = useCachedUser()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.AUTHORIZER)
}

export const useIsIssuer = () => {
  const user = useCachedUser()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.ISSUER)
}

export const useIsAccredited = () => {
  const user = useCachedUser()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.ACCREDITED)
}

export const useIsEnabled2FA = () => {
  const user = useCachedUser()

  return user?.totpConfirmed ?? false
}

export const useHasSpecialRole = () => {
  const isAdmin = useIsAdmin()
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()

  return isAdmin || isAuthorizer || isIssuer
}
