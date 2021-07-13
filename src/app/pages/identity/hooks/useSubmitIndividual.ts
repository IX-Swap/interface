import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export const useSubmitIndividual = (callback?: () => void) => {
  const { snackbarService, apiService, storageService } = useServices()
  const queryCache = useQueryCache()

  const submitIndividual = async (id: string) => {
    const uri = identityURL.individuals.submit(id)
    return await apiService.patch<IndividualIdentity>(uri, {})
  }

  return useMutation(submitIndividual, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      callback?.()
      void queryCache.invalidateQueries(identityQueryKeys.getIndividual)

      // TODO: remove this once we come up with a better solution to determine what kind of identity has been submitted and whether user is still in the onboarding proces
      if (data.data.authorizations.length === 0) {
        storageService.set(data.data._id, 'individual')
      }
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
