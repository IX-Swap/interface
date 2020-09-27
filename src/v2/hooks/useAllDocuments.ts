import { useInfiniteQuery } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { PaginatedData } from 'v2/services/api/types'
import { paginationArgs } from 'v2/config/defaults'
import { useParsedData } from 'v2/hooks/useParsedData'
import { Document } from 'v2/types/document'

export const USE_DOCUMENT_QUERY_KEY = 'useDocument'

export const useAllDocuments = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const url = `/dataroom/list/${user?._id ?? ''}`
  const downloadFile = async () => {
    return await apiService.post<PaginatedData<Document>>(url, {
      ...paginationArgs,
      skip: 100
    })
  }
  const { data, ...rest } = useInfiniteQuery(
    [USE_DOCUMENT_QUERY_KEY],
    downloadFile
  )

  return {
    ...rest,
    data: useParsedData<Document>(data, '_id')
  }
}
