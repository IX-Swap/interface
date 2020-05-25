import { useLocation } from 'react-router-dom';
import { useUserState } from 'context/user';

/**
 * Checks if signed in user has the key "totpConfirmed" marked as true
 * Note: This hook should be used under UserProvider
 */
function useRedirectTo2faSetup() {
  const { status, user: { totpConfirmed = false } = {} } = useUserState();
  const { pathname } = useLocation();

  if (!pathname.match(/^\/security.*$/) && status === 'IDLE') {
    return !totpConfirmed;
  }

  return false;
}

export default useRedirectTo2faSetup;
