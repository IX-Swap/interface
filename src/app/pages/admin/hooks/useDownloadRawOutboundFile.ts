import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { virtualAccountsAudit } from 'config/apiURL'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { DownloadDocument } from 'hooks/useDownloadRawDocument'

export const useDownloadRawOutboundFile = (
  document: DownloadDocument,
  callbacks?: QueryOrMutationCallbacks<Blob>
) => {
  const { snackbarService, apiService } = useServices()
  const { documentId, uri } = document
  const url = virtualAccountsAudit.getRawOutboundFile(documentId)
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
