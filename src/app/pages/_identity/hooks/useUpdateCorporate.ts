import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { identityQueryKeys } from 'config/queryKeys'
import { CorporateIdentity } from 'app/pages/_identity/types/forms'

export const useUpdateCorporate = (corporateType: string) => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { params } = useIdentitiesRouter()
  const queryCache = useQueryCache()

  const updateCorporate = async (values: any) => {
    const uri = identityURL.corporates.update(userId, params.identityId)
    return await apiService.put<CorporateIdentity>(uri, {
      ...values,
      type: corporateType
    })
  }

  return useMutation(updateCorporate, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      await queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
