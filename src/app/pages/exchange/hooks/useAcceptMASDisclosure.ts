import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { resources } from 'config/apiURL'
import { resourcesQueryKeys } from 'config/queryKeys'

export const useAcceptMASDisclosure = () => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()

  const acceptMASDisclosure = async () => {
    const uri = resources.acceptMasDisclosure
    return await apiService.post(uri, {})
  }

  return useMutation(acceptMASDisclosure, {
    onSuccess: async data => {
      await snackbarService.showSnackbar(data.message, 'success')
      await queryCache.invalidateQueries(resourcesQueryKeys.getSiteConfig)
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
