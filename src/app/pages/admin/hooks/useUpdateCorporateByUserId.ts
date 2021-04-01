import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { CorporateIdentity } from 'app/pages/_identity/types/forms'

export const useUpdateCorporateByUserId = (
  userId: string,
  identityId: string,
  corporateType: string
) => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()

  const updateCorporate = async (values: any) => {
    const uri = identityURL.corporates.update(userId, identityId)
    return await apiService.put<CorporateIdentity>(uri, {
      ...values,
      type: corporateType
    })
  }

  return useMutation(updateCorporate, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      await queryCache.invalidateQueries(
        identityQueryKeys.getAllCorporateByUserId(userId)
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
