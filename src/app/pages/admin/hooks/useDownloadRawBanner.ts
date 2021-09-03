import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { bannerURL } from 'config/apiURL'
import { QueryOrMutationCallbacks } from 'hooks/types'

export interface DownloadBanner {
  bannerId: string
  uri?: string
}

export const useDownloadRawBanner = (
  banner: DownloadBanner,
  callbacks?: QueryOrMutationCallbacks<Blob>
) => {
  const { snackbarService, apiService } = useServices()
  const { bannerId, uri } = banner
  const url = bannerURL.getRowBanner(bannerId)
  const downloadBanner = async () => {
    return await apiService.get<Blob>(uri ?? url, { responseType: 'blob' })
  }

  return useMutation(downloadBanner, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
    },
    onError: (error: any) => {
      callbacks?.onError?.(error)
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
