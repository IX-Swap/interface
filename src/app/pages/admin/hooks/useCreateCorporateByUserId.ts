import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { CorporateIdentity } from 'types/identity'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'

export const useCreateCorporateByUserId = (
  userId: string,
  corporateType: string
) => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()

  const createCorporate = async (values: any) => {
    const uri = identityURL.corporates.create(userId)
    return await apiService.post<CorporateIdentity>(uri, {
      ...values,
      type: corporateType
    })
  }

  return useMutation(createCorporate, {
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
