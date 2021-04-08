import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useSubmitDetailsOfIssuance = (issuanceId: string) => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()

  const updateDetailsOfIssuance = async () => {
    const uri = identityURL.detailsOfIssuance.submit(issuanceId)
    return await apiService.patch(uri, {})
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
