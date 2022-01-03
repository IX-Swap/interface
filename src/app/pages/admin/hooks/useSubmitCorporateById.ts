import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export const useSubmitCorporateById = (
  userId?: string,
  identityId?: string
) => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()

  const submitCorporate = async () => {
    if (!userId) {
      throw new Error('userId is required')
    }

    if (!identityId) {
      throw new Error('identityId is required')
    }

    const uri = identityURL.corporates.submit(identityId)
    return await apiService.patch<CorporateIdentity>(uri, {})
  }

  return useMutation(submitCorporate, {
    onSuccess: async data => {
      snackbarService.showSnackbar(data.message, 'success')
      await queryCache.invalidateQueries(
        identityQueryKeys.getAllCorporateByUserId(userId)
      )
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
