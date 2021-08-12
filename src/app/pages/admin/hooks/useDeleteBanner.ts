import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { DataroomFile } from 'types/dataroomFile'
import { bannerURL } from 'config/apiURL'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { bannersQueryKeys } from 'config/queryKeys'

export const useDeleteBanner = (
  bannerId: string,
  callbacks?: QueryOrMutationCallbacks<DataroomFile>
) => {
  const { snackbarService, apiService } = useServices()
  const url = bannerURL.deleteBanner(bannerId)
  const queryCache = useQueryCache()

  const deleteBanner = async () => {
    return await apiService.delete<DataroomFile>(url, {})
  }

  return useMutation(deleteBanner, {
    onSuccess: async data => {
      void snackbarService.showSnackbar('Success', 'success')
      void callbacks?.onSuccess?.(data)
      await queryCache.invalidateQueries(bannersQueryKeys.getBannersList)
    },
    onError: error => {
      void snackbarService.showSnackbar('Error', 'error')
      void callbacks?.onError?.(error)
    }
  })
}
