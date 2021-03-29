import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { IndividualIdentity } from 'types/identity'
import { identityURL } from 'config/apiURL'

export const useCreateIndividualByUserId = (userId: string) => {
  const { snackbarService, apiService } = useServices()
  const uri = identityURL.individuals.create(userId)

  const createOrUpdateIndividual = async (values: any) => {
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
