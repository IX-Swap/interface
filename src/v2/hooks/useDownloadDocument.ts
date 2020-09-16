import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Document } from 'v2/types/document'

const openFileFromBlobInNewTab = (blob: Blob, name: string) => {
  const file = new File([blob], name, { type: blob.type })
  const url = window.URL.createObjectURL(file) // TODO: fix file name

  window.open(url)
}

export const useDownloadDocument = (document: Document) => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const url = `/dataroom/raw/${user?._id ?? ''}/${document._id}`
  const downloadFile = async () => {
    return await apiService.get<Blob>(url, { responseType: 'blob' })
  }

  return useMutation(downloadFile, {
    onSuccess: data => {
      openFileFromBlobInNewTab(data.data, document.originalFileName)
    },
    onError: () => {
      void snackbarService.showSnackbar('Failed to download the file', 'error')
    }
  })
}
