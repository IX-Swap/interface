import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { isEmptyString } from 'helpers/strings'

export const useCreateCorporateByUserId = (
  userId?: string,
  corporateType?: string
) => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()

  const createCorporate = async (values: any) => {
    if (isEmptyString(userId)) return

    const uri = identityURL.corporates.create(userId)
    return await apiService.post<CorporateIdentity>(uri, {
      ...values,
      type: corporateType
    })
  }

  return useMutation(createCorporate, {
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
