import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useParams } from 'react-router-dom'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export const useCreateCorporateAccreditation = () => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()
  const params = useParams<{ identityId: string }>()

  const createCorporate = async (values: any) => {
    const uri = identityURL.corporates.accreditation.create(params.identityId)

    values.step =
      Number(typeof values.step !== 'undefined' ? values.step : 1) + 1

    return await apiService.put<CorporateIdentity>(uri, {
      ...values
    })
  }

  return useMutation(createCorporate, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(
        identityQueryKeys.getAllCorporateAccreditation
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
