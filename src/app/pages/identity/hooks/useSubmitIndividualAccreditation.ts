import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export const useSubmitIndividualAccreditation = (callback?: () => void) => {
  const { snackbarService, apiService, storageService } = useServices()
  const params = useParams<{ identityId: string }>()
  const queryCache = useQueryCache()
  const { replace } = useHistory()

  const submitIndividual = async (data: IndividualIdentity) => {
    const uri = identityURL.individuals.accreditation.submit(params.identityId)
    return await apiService.patch<IndividualIdentity>(uri, {
      ...getIndividualAccreditationSubmitPayload(data)
    })
  }

  return useMutation(submitIndividual, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      callback?.()
      void queryCache.invalidateQueries(identityQueryKeys.getAllIndividual)

      // TODO: remove this once we come up with a better solution to determine what kind of identity has been submitted and whether user is still in the onboarding proces
      if (data.data.authorizations.length === 0) {
        storageService.set(data.data._id, data?.data?.type)
      }

      replace(IdentityRoute.identitySuccess)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
function getIndividualAccreditationSubmitPayload(
  data: IndividualIdentity
): any {
  throw new Error('Function not implemented.')
}
