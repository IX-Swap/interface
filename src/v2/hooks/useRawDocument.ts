import { useQuery } from 'react-query'
import { useServices } from 'v2/hooks/useServices'
import { DownloadDocument } from 'v2/hooks/useDownloadRawDocument'
import { useDataroomFileURL } from 'v2/hooks/useDataroomFileURL'

export const USE_RAW_DOCUMENT_QUERY_KEY = 'useDocumentById'

export const useRawDocument = (document: DownloadDocument) => {
  const { apiService } = useServices()
  const url = useDataroomFileURL(document.documentId, document.ownerId)
  const downloadFile = async () => {
    return await apiService.get<Blob>(url, { responseType: 'blob' })
  }

  return useQuery(
    [USE_RAW_DOCUMENT_QUERY_KEY, document.documentId, document.ownerId],
    downloadFile
  )
}
