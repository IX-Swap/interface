import { IdentityRoute } from 'app/pages/identity/router/config'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { generatePath, useHistory } from 'react-router-dom'

export const useCreateIndividual = () => {
  const { snackbarService, apiService } = useServices()
  const { replace, location } = useHistory()
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
      void queryCache.invalidateQueries(identityQueryKeys.getIndividual)
      // eslint-disable-next-line
      if (location.pathname.endsWith('create')) {
        replace(
          generatePath(IdentityRoute.editIndividual, {
            identityId: data.data._id,
            userId: data.data.user._id
          })
        )
      }
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
