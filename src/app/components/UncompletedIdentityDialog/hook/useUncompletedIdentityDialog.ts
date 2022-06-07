import { useSnackbar } from 'hooks/useSnackbar'
import { UncompletedIdentityDialog } from 'app/components/UncompletedIdentityDialog/UncompletedIdentityDialog'
import { useAppNavigation } from 'app/components/Header/hooks/useAppNavigation'

export const useUncompletedIdentityDialog = (pathname: string) => {
  const { showDialog } = useSnackbar()
  const { isNavigationImpossibleWithoutCompletedIdentity } = useAppNavigation()

  const showUncompletedIdentityDialog = () => {
    if (isNavigationImpossibleWithoutCompletedIdentity(pathname)) {
      showDialog(UncompletedIdentityDialog)
    }
  }

  return {
    showUncompletedIdentityDialog
  }
}
