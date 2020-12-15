import { useInfiniteQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { PaginatedData } from 'services/api/types'
import { paginationArgs } from 'config/defaults'
import { useParsedData } from 'hooks/useParsedData'
import { DataroomFile } from 'types/dataroomFile'
import { getIdFromObj } from 'helpers/strings'
import { documentsQueryKeys } from 'config/queryKeys'
import { documentsURL } from 'config/apiURL'

export const useAllDocuments = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const url = documentsURL.getAll(getIdFromObj(user))
  const downloadFile = async () => {
    return await apiService.post<PaginatedData<DataroomFile>>(url, {
      ...paginationArgs,
      skip: 100
    })
  }
  const { data, ...rest } = useInfiniteQuery(
    [documentsQueryKeys.getAll],
    downloadFile
  )

  return {
    ...rest,
    data: useParsedData<DataroomFile>(data, '_id')
  }
}
