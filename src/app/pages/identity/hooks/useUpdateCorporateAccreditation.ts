import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export const useUpdateCorporateAccreditation = () => {
  const { snackbarService, apiService } = useServices()
  const params = useParams<{ identityId: string }>()
  const queryCache = useQueryCache()

  const updateCorporateAccreditation = async (values: any) => {
    const uri = identityURL.corporates.accreditation.update(params.identityId)

    values.step =
      typeof values.step === 'undefined' || values.step < 2 ? 2 : values.step

    delete values._id

    return await apiService.put<CorporateIdentity>(uri, {
      ...values
    })
  }

  return useMutation(updateCorporateAccreditation, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)
      await queryCache.invalidateQueries([
        identityQueryKeys.getCorporateAccreditation(data.data?._id)
      ])
    },
    onError: (error: any) => {
      if (params.identityId !== undefined) {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  })
}
