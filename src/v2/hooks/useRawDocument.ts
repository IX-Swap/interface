import { useQuery } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { DownloadDocument } from 'v2/hooks/useDownloadRawDocument'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useIsAuthorizer } from 'v2/helpers/acl'
import { getIdFromObj } from 'v2/helpers/strings'

export const USE_RAW_DOCUMENT_QUERY_KEY = 'useDocumentById'

export const useRawDocument = (document: DownloadDocument) => {
  const isAuthorizer = useIsAuthorizer()
  const { apiService } = useServices()
  const { user } = useAuth()
  const ownerId =
    document.ownerId === '' ? getIdFromObj(user) : document.ownerId
  const url = `/dataroom/raw/${isAuthorizer ? '' : `${ownerId}/`}${
    document.documentId
  }`
  const downloadFile = async () => {
    return await apiService.get<Blob>(url, { responseType: 'blob' })
  }

  return useQuery(
    [USE_RAW_DOCUMENT_QUERY_KEY, document.documentId, document.ownerId],
    downloadFile
  )
}
