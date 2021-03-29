import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { IndividualIdentity } from 'types/identity'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useHistory } from 'react-router'
import { IdentityRoute } from 'app/pages/_identity/router/config'
import { generatePath } from 'react-router-dom'

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
      await queryCache.invalidateQueries(identityQueryKeys.getIndividual)

      if (location.pathname.endsWith('create')) {
        replace(
          generatePath(IdentityRoute.editIndividual, {
            identityId: data.data._id
          })
        )
      }
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
