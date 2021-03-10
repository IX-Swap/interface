import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation } from 'react-query'
import { CorporateIdentity } from 'types/identity'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { useIdentitiesRouter } from 'app/pages/_identity/router'

export const useUpdateCorporate = () => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { params } = useIdentitiesRouter()

  const createCorporate = async (values: any) => {
    const uri = identityURL.corporates.update(userId, params.identityId)
    return await apiService.put<CorporateIdentity>(uri, values)
  }

  return useMutation(createCorporate, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
