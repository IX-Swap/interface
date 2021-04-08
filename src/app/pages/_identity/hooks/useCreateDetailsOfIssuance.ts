import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useCreateDetailsOfIssuance = () => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const queryCache = useQueryCache()

  const createDetailsOfIssuance = async (values: any) => {
    const uri = identityURL.detailsOfIssuance.create(userId)
    return await apiService.post(uri, values)
  }

  return useMutation(createDetailsOfIssuance, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getDetailsOfIssuance)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
