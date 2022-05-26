import { useSnackbar } from 'hooks/useSnackbar'
import { useIsAdmin } from 'helpers/acl'
import { UncompletedIdentityDialog } from 'app/components/UncompletedIdentityDialog/UncompletedIdentityDialog'
import { useAppNavigation } from 'app/components/Header/hooks/useAppNavigation'

export const useUncompletedIdentityDialog = (pathname: string) => {
  const { showDialog } = useSnackbar()
  const isAdmin = useIsAdmin()
  const { isNavigationPossibleWithoutCompletedIdentity } = useAppNavigation()

  const showUncompletedIdentityDialog = () => {
    if (!isNavigationPossibleWithoutCompletedIdentity(pathname) || isAdmin) {
      return null
    } else {
      showDialog(UncompletedIdentityDialog)
    }
  }

  return {
    showUncompletedIdentityDialog
  }
}
