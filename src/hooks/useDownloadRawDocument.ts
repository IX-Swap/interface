import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from './types'
import { useDataroomFileURL } from 'hooks/useDataroomFileURL'

export interface DownloadDocument {
  documentId: string
  ownerId: string
}

export const useDownloadRawDocument = (
  document: DownloadDocument,
  callbacks?: QueryOrMutationCallbacks<Blob>
) => {
  const { snackbarService, apiService } = useServices()
  const url = useDataroomFileURL(document.documentId, document.ownerId)
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
