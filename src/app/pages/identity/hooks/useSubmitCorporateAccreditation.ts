import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { getCorporateAccreditationSubmitPayload } from 'app/pages/identity/utils/corporate/requests'

export const useSubmitCorporateAccreditation = (callback?: () => void) => {
  const { snackbarService, apiService, storageService } = useServices()
  const params = useParams<{ userId: string; identityId: string }>()
  const queryCache = useQueryCache()
  const { location, replace } = useHistory()

  const submitCorporate = async (data: CorporateIdentity) => {
    const uri = identityURL.corporates.accreditation.submit(params.identityId)
    return await apiService.patch<CorporateIdentity>(uri, {
      ...getCorporateAccreditationSubmitPayload(data)
    })
  }

  return useMutation(submitCorporate, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      callback?.()
      void queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)

      // TODO: remove this once we come up with a better solution to determine what kind of identity has been submitted and whether user is still in the onboarding proces
      if (data.data.authorizations.length === 0) {
        storageService.set(data.data._id, data.data.type)
      }

      if (location.pathname.includes('authorizer')) {
        replace(
          `/app/authorizer/corporates/${params.userId}/${params.identityId}/view?tab=accreditation`
        )
      } else {
        replace(IdentityRoute.identitySuccess)
      }
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}