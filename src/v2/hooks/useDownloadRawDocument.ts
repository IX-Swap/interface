import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from './types'
import { useAuth } from './auth/useAuth'

export interface DownloadDocument {
  documentId: string
  ownerId: string
}

export const useDownloadRawDocument = (
  document: DownloadDocument,
  callbacks?: QueryOrMutationCallbacks<Blob>
) => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const ownerId = document.ownerId === '' ? user?._id ?? '' : document.ownerId
  const url = `/dataroom/raw/${ownerId}/${document.documentId}`
  const downloadFile = async () => {
    return await apiService.get<Blob>(url, { responseType: 'blob' })
  }

  return useMutation(downloadFile, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
    },
    onError: error => {
      callbacks?.onError?.(error)
      void snackbarService.showSnackbar('Failed to download the file', 'error')
    }
  })
}
