import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from './types'

export const useDownloadRawFile = (
  uri: string,
  callbacks?: QueryOrMutationCallbacks<Blob>
) => {
  const { snackbarService, apiService } = useServices()
  const downloadFile = async () => {
    return await apiService.get<Blob>(uri, { responseType: 'blob' })
  }

  return useMutation(downloadFile, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
    },
    onError: (error: any) => {
      callbacks?.onError?.(error)
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
