import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from './types'
import { useDataroomFileURL } from 'hooks/useDataroomFileURL'

export interface DownloadDocument {
  documentId: string
  ownerId?: string
  uri?: string
}

export const useDownloadRawDocument = (
  document: DownloadDocument,
  callbacks?: QueryOrMutationCallbacks<Blob>
) => {
  const { snackbarService, apiService } = useServices()
  const { documentId, ownerId, uri } = document
  const url = useDataroomFileURL(documentId, ownerId)
  const downloadFile = async () => {
    return await apiService.get<Blob>(uri ?? url, { responseType: 'blob' })
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
