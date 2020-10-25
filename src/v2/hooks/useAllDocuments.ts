import { useInfiniteQuery } from 'react-query'
import { useServices } from 'v2/hooks/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { PaginatedData } from 'v2/services/api/types'
import { paginationArgs } from 'v2/config/defaults'
import { useParsedData } from 'v2/hooks/useParsedData'
import { DataroomFile } from 'v2/types/dataroomFile'
import { getIdFromObj } from 'v2/helpers/strings'

export const USE_DOCUMENT_QUERY_KEY = 'useDocument'

export const useAllDocuments = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const url = `/dataroom/list/${getIdFromObj(user)}`
  const downloadFile = async () => {
    return await apiService.post<PaginatedData<DataroomFile>>(url, {
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
    data: useParsedData<DataroomFile>(data, '_id')
  }
}
