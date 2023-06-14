import includes from 'lodash/includes'
import { useCachedUser } from 'hooks/auth/useCachedUser'

export enum AppRole {
  ADMIN = 'admin',
  AUTHORIZER = 'authorizer',
  ISSUER = 'issuer',
  USER = 'user',
  ACCREDITED = 'accredited',
  RETAIL = 'retail',
  EXPERT = 'expert',
  CLIENT = 'client',
  // TODO backend api always return lowercase
  FUND_MANAGER = 'fundmanager',
  TENANT_OWNER = 'tenantOwner'
}

export const getUserRoles = (roles?: string) => {
  if (roles === undefined) {
    return []
  }

  return roles.split(',') as AppRole[]
}

export const hasRole = (roles: string | undefined, roleToCheck: AppRole) => {
  if (roles === undefined) {
    return false
  }

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

export const useIsClient = () => {
  const user = useCachedUser()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.CLIENT)
}

export const useIsFundManager = () => {
  const user = useCachedUser()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.FUND_MANAGER)
}

export const isSuperUser = (roles?: string) => {
  if (roles === undefined) {
    return false
  }

  return hasRole(roles, AppRole.AUTHORIZER) || hasRole(roles, AppRole.ADMIN)
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

export const useIsRetail = () => {
  const user = useCachedUser()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.RETAIL)
}

export const useIsExpert = () => {
  const user = useCachedUser()

  if (user === undefined) return false

  return hasRole(user.roles, AppRole.EXPERT)
}

export const useHasSpecialRole = () => {
  const isAdmin = useIsAdmin()
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()

  return isAdmin || isAuthorizer || isIssuer
}
