import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { identityURL } from 'config/apiURL'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export const useCreateIndividualByUserId = (userId?: string) => {
  const { snackbarService, apiService } = useServices()
  const uri = identityURL.individuals.create(userId)

  const createOrUpdateIndividual = async (values: any) => {
    if (!userId) {
      throw new Error('userId is required')
    }

    return await apiService.put<IndividualIdentity>(uri, values)
  }

  return useMutation(createOrUpdateIndividual, {
    onSuccess: async data => {
      snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
