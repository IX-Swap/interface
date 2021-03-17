import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { CorporateIdentity } from 'types/identity'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'

export const useUpdateCorporate = (corporateType: string) => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const params = useParams<{ identityId: string }>()
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
