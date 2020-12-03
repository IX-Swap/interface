import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { DownloadDocument } from 'hooks/useDownloadRawDocument'
import { useDataroomFileURL } from 'hooks/useDataroomFileURL'
import { documentsQueryKeys } from 'config/queryKeys'

export const useRawDocument = (document: DownloadDocument) => {
  const { apiService } = useServices()
  const url = useDataroomFileURL(document.documentId, document.ownerId)
  const downloadFile = async () => {
    return await apiService.get<Blob>(url, { responseType: 'blob' })
  }

  return useQuery(
    [documentsQueryKeys.getById, document.documentId, document.ownerId],
    downloadFile
  )
}
