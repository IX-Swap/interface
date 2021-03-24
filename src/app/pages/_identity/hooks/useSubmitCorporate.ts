import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { CorporateIdentity } from 'types/identity'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { useIdentitiesRouter } from 'app/pages/_identity/router'

export const useSubmitCorporate = () => {
  const { snackbarService, apiService, storageService } = useServices()
  const { showPostIdentityCreateDialog } = useOnboardingDialog()
  const { params } = useIdentitiesRouter()
  const queryCache = useQueryCache()

  const submitCorporate = async () => {
    const uri = identityURL.corporates.submit(params.identityId)
    return await apiService.patch<CorporateIdentity>(uri, {})
  }

  return useMutation(submitCorporate, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      showPostIdentityCreateDialog('corporate', data.data.type)
      void queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)

      // TODO: remove this once we come up with a better solution to determine what kind of identity has been submitted and whether user is still in the onboarding proces
      if (data.data.authorizations.length === 0) {
        storageService.set(data.data._id, data.data.type)
      }
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
