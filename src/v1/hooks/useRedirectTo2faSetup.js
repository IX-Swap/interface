import { useLocation } from 'react-router-dom'
import { useUserState } from 'v1/context/user'
import { useHasSpecialRole } from 'v1/services/acl'

/**
 * Checks if signed in user has the key "totpConfirmed" marked as true
 * Note: This hook should be used under UserProvider
 */
function useRedirectTo2faSetup () {
  const { status, user: { totpConfirmed = false } = {} } = useUserState()
  const { pathname } = useLocation()
  const hasSpecialRole = useHasSpecialRole()

  if (!pathname.match(/^\/security.*$/) && status === 'IDLE') {
    return hasSpecialRole ? false : !totpConfirmed
  }

  return false
}

export default useRedirectTo2faSetup
