import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export const useUpdateIndividualAccreditation = () => {
  const { snackbarService, apiService } = useServices()
  const params = useParams<{ identityId: string }>()
  const queryCache = useQueryCache()

  const udateIndividualAccreditation = async (values: any) => {
    const uri = identityURL.individuals.accreditation.update(params.identityId)

    values.step =
      typeof values.step === 'undefined' || values.step < 2 ? 2 : values.step

    return await apiService.put<IndividualIdentity>(uri, {
      ...values
    })
  }

  return useMutation(udateIndividualAccreditation, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getAllIndividual)
      await queryCache.invalidateQueries([
        identityQueryKeys.getIndividualAccreditation(data.data?._id)
      ])
    },
    onError: (error: any) => {
      if (params.identityId !== undefined) {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  })
}
