import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { IndividualIdentity } from 'types/identity'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'

export const useCreateIndividual = () => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const uri = identityURL.individuals.create(userId)

  const createOrUpdateIndividual = async (values: any) => {
    return await apiService.put<IndividualIdentity>(uri, values)
  }

  return useMutation(createOrUpdateIndividual, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getIndividual)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
