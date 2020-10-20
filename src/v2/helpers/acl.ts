import { includes } from 'lodash'
import { useAuth } from 'v2/hooks/auth/useAuth'

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
  const { user } = useAuth()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.ADMIN)
}

export const useIsAuthorizer = () => {
  const { user } = useAuth()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.AUTHORIZER)
}

export const useIsIssuer = () => {
  const { user } = useAuth()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.ISSUER)
}

export const useIsAccredited = () => {
  const { user } = useAuth()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.ACCREDITED)
}

export const useIsEnabled2FA = () => {
  const { user } = useAuth()

  return user?.totpConfirmed ?? false
}

export const useHasSpecialRole = () => {
  const isAdmin = useIsAdmin()
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()

  return isAdmin || isAuthorizer || isIssuer
}
