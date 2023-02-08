import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useCreateIndividual = () => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const uri = identityURL.individuals.create(userId)

  const createOrUpdateIndividual = async (values: any) => {
    const newValues = { ...values }

    // remove photo field if the avatar is removed at step 0
    if (values.step === 0 && values.photo === undefined) {
      newValues.photo = null
    }
    return await apiService.put<IndividualIdentity>(uri, newValues)
  }

  return useMutation(createOrUpdateIndividual, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getIndividual)
    },
    onError: (error: any) => {
      if (error.message !== 'Could not update your identity') {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  })
}
