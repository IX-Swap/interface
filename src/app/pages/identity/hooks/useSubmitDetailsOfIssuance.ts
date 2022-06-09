import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useHistory } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'

export const useSubmitDetailsOfIssuance = (issuanceId: string) => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const { replace } = useHistory()

  const updateDetailsOfIssuance = async () => {
    const uri = identityURL.detailsOfIssuance.submit(issuanceId)
    return await apiService.patch(uri, {})
  }

  return useMutation(updateDetailsOfIssuance, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getDetailsOfIssuance)
      replace(IdentityRoute.identitySuccess)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
