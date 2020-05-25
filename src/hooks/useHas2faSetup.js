import { useUserState } from 'context/user';

/**
 * Checks if signed in user has the key "totpConfirmed" marked as true
 * Note: This hook should be used under UserProvider
 */
function useHas2faSetup() {
  const {
    user: { totpConfirmed = false },
  } = useUserState();

  return totpConfirmed;
}

export default useHas2faSetup;
