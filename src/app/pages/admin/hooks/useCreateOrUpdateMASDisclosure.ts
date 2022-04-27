import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { resources } from 'config/apiURL'
import { resourcesQueryKeys } from 'config/queryKeys'

export const useCreateOrUpdateMASDisclosure = () => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()

  const createOrUpdateMASDisclosure = async (values: any) => {
    const uri = resources.createOrUpdateMasDisclosure
    return await apiService.post(uri, {
      ...values
    })
  }

  return useMutation(createOrUpdateMASDisclosure, {
    onSuccess: async data => {
      await snackbarService.showSnackbar(data.message, 'success')
      await queryCache.invalidateQueries(resourcesQueryKeys.getSiteConfig)
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
