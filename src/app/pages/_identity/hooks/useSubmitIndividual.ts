import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { IndividualIdentity } from 'types/identity'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'

export const useSubmitIndividual = () => {
  const { snackbarService, apiService } = useServices()
  const { showPostIdentityCreateDialog } = useOnboardingDialog()
  const queryCache = useQueryCache()

  const submitIndividual = async (id: string) => {
    const uri = identityURL.individuals.submit(id)
    return await apiService.patch<IndividualIdentity>(uri, {})
  }

  return useMutation(submitIndividual, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      showPostIdentityCreateDialog('individual')
      void queryCache.invalidateQueries(identityQueryKeys.getIndividual)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
