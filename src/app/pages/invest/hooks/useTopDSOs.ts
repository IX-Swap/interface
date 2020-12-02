import { useInfiniteQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { PaginatedData, PaginationArgs } from 'services/api/types'
import { paginationArgs } from 'config/defaults'
import { DigitalSecurityOffering } from 'types/dso'
import { useParsedData, UsePaginatedQueryData } from 'hooks/useParsedData'

export const USE_TOP_DSOS_QUERY_KEY = 'topDSOs'

export const useTopDSOs = (): UsePaginatedQueryData<
  DigitalSecurityOffering
> => {
  const { apiService } = useServices()
  const uri = '/issuance/dso/list/approved'

  const getTopDSOs = async (queryKey: string, args: PaginationArgs) => {
    return await apiService.post<PaginatedData<DigitalSecurityOffering>>(
      uri,
      args
    )
  }
  const { data, ...queryResult } = useInfiniteQuery(
    [USE_TOP_DSOS_QUERY_KEY, paginationArgs],
    getTopDSOs
  )

  return {
    ...queryResult,
    data: useParsedData<DigitalSecurityOffering>(data, '_id')
  }
}
