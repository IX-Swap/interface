import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from './types'
import { useAuth } from './auth/useAuth'
import { getIdFromObj } from 'v2/helpers/strings'

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
  const ownerId =
    document.ownerId === '' ? getIdFromObj(user) : document.ownerId
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
