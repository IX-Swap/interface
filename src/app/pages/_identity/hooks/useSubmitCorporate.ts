import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { IndividualIdentity } from 'types/identity'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { useIdentitiesRouter } from 'app/pages/_identity/router'

export const useSubmitCorporate = () => {
  const { snackbarService, apiService } = useServices()
  const { showPostIdentityCreateDialog } = useOnboardingDialog()
  const { params } = useIdentitiesRouter()
  const queryCache = useQueryCache()

  const submitCorporate = async () => {
    const uri = identityURL.corporates.submit(params.identityId)
    return await apiService.patch<IndividualIdentity>(uri, {})
  }

  return useMutation(submitCorporate, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      showPostIdentityCreateDialog('corporate')
      void queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
