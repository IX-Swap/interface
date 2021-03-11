import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { CorporateIdentity } from 'types/identity'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { identityQueryKeys } from 'config/queryKeys'

export const useCreateCorporate = () => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()
  const { replace } = useIdentitiesRouter()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const createCorporate = async (values: any) => {
    const uri = identityURL.corporates.create(userId)
    return await apiService.post<CorporateIdentity>(uri, values)
  }

  return useMutation(createCorporate, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)
      replace('editCorporate', { identityId: data.data._id })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
