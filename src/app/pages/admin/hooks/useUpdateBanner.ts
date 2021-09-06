import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { bannerURL } from 'config/apiURL'
import { bannersQueryKeys } from 'config/queryKeys'

export const useUpdateBanner = (bannerId: string) => {
  const { snackbarService, apiService } = useServices()
  const uri = bannerURL.updateBanner(bannerId)
  const queryCache = useQueryCache()

  const updateBanner = async (values: any) => {
    return await apiService.put(uri, values)
  }

  return useMutation(updateBanner, {
    onSuccess: async data => {
      snackbarService.showSnackbar(data.message, 'success')
      await queryCache.invalidateQueries(bannersQueryKeys.getBannersList)
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
