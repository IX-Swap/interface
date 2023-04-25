import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useParams } from 'react-router-dom'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export const useCreateIndividualAccreditation = () => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()
  const params = useParams<{ identityId: string }>()

  const createIndividual = async (values: any) => {
    const uri = identityURL.individuals.accreditation.create(params.identityId)

    values.step =
      typeof values.step === 'undefined' || values.step < 2 ? 2 : values.step

    return await apiService.put<IndividualIdentity>(uri, {
      ...values
    })
  }

  return useMutation(createIndividual, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(
        identityQueryKeys.getAllIndividualAccreditation
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
