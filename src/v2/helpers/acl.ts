import { includes } from 'lodash'
import { useUserStore } from 'v2/auth/context'
import { useUser } from 'v2/auth/hooks/useUser'

// RBACL Algorithm for Frontend

// - A user can Login without 2-factor authentication.
// - The user must complete 2-factor authentication before accessing any page.
//   It will always force redirect to 2-Factor Authentication page if not complete
// - Once 2-FA is complete, the user will be redirected to complete identity before they can access any pages.
// - Once Identity is "approved" for a user, the user will automatically have a new role called "accredited".
// - Once accredited or "identity approved", the user will be able to access the web application features.

/**
 * Roles definition
 */
export const appRoles = {
  ADMIN: 'admin',
  AUTHORIZER: 'authorizer',
  ISSUER: 'issuer',
  USER: 'user',
  ACCREDITED: 'accredited'
}

/**
 * Converts payload (csv) roles to array
 */
const rolesCsvToArray = (roles: string): string[] => roles.split(',')

/**
 * Generic role checker
 */
const hasRole = (roles: string, roleToCheck: string): boolean => {
  const rolesList = rolesCsvToArray(roles)

  return includes(rolesList, roleToCheck)
}

/**
 * Roles hooks
 * Assumption: Theses hooks are used inside UserContext
 */

export const useIsAdmin = (): boolean => {
  const { data: user } = useUser()

  if (user === undefined) return false

  return hasRole(user.roles, appRoles.ADMIN)
}

export const useIsAuthorizer = (): boolean => {
  const { data: user } = useUser()

  if (user === undefined) return false

  return hasRole(user.roles, appRoles.AUTHORIZER)
}

export const useIsIssuer = (): boolean => {
  const { data: user } = useUser()

  if (user === undefined) return false

  return hasRole(user.roles, appRoles.ISSUER)
}

export const useIsAccredited = (): boolean => {
  const { data: user } = useUser()

  if (user === undefined) return false

  return hasRole(user.roles, appRoles.ACCREDITED)
}

export const useHasSpecialRole = (): boolean => {
  const isAdmin = useIsAdmin()
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()

  return isAdmin || isAuthorizer || isIssuer
}
