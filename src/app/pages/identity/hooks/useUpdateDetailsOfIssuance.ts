import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useUpdateDetailsOfIssuance = (issuanceId: string) => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const queryCache = useQueryCache()

  const updateDetailsOfIssuance = async (values: any) => {
    const uri = identityURL.detailsOfIssuance.update(userId, issuanceId)
    return await apiService.put(uri, values)
  }

  return useMutation(updateDetailsOfIssuance, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getDetailsOfIssuance)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
