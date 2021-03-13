import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { IndividualIdentity } from 'types/identity'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useIdentitiesRouter } from 'app/pages/_identity/router'

export const useCreateIndividual = () => {
  const { snackbarService, apiService } = useServices()
  const { replace, paths, current } = useIdentitiesRouter()
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const uri = identityURL.individuals.create(userId)

  const createOrUpdateIndividual = async (values: any) => {
    return await apiService.put<IndividualIdentity>(uri, values)
  }

  return useMutation(createOrUpdateIndividual, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      await queryCache.invalidateQueries(identityQueryKeys.getIndividual)

      if (current.path === paths.createIndividual) {
        replace('editIndividual', { identityId: data.data._id })
      }
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
