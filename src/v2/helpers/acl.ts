import { includes } from 'lodash'
import { useAuth } from 'v2/hooks/auth/useAuth'

// RBACL Algorithm for Frontend
// - A user can Login without 2-factor authentication.
// - The user must complete 2-factor authentication before accessing any page.
//   It will always force redirect to 2-Factor Authentication page if not complete
// - Once 2-FA is complete, the user will be redirected to complete identity before they can access any pages.
// - Once Identity is "approved" for a user, the user will automatically have a new role called "accredited".
// - Once accredited or "identity approved", the user will be able to access the web application features.

export const appRoles = {
  ADMIN: 'admin',
  AUTHORIZER: 'authorizer',
  ISSUER: 'issuer',
  USER: 'user',
  ACCREDITED: 'accredited'
}

const rolesCsvToArray = (roles: string): string[] => roles.split(',')

const hasRole = (roles: string, roleToCheck: string): boolean => {
  const rolesList = rolesCsvToArray(roles)

  return includes(rolesList, roleToCheck)
}

export const useIsAdmin = (): boolean => {
  const { user } = useAuth()

  if (user === undefined) return false

  return hasRole(user.roles, appRoles.ADMIN)
}

export const useIsAuthorizer = (): boolean => {
  const { user } = useAuth()

  if (user === undefined) return false

  return hasRole(user.roles, appRoles.AUTHORIZER)
}

export const useIsIssuer = (): boolean => {
  const { user } = useAuth()

  if (user === undefined) return false

  return hasRole(user.roles, appRoles.ISSUER)
}

export const useIsAccredited = (): boolean => {
  const { user } = useAuth()

  if (user === undefined) return false

  return hasRole(user.roles, appRoles.ACCREDITED)
}

export const useHasSpecialRole = (): boolean => {
  const isAdmin = useIsAdmin()
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()

  return isAdmin || isAuthorizer || isIssuer
}
