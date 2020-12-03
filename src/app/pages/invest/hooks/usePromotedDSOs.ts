import { useInfiniteQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { PaginatedData, PaginationArgs } from 'services/api/types'
import { paginationArgs } from 'config/defaults'
import { DigitalSecurityOffering } from 'types/dso'
import { useParsedData, UsePaginatedQueryData } from 'hooks/useParsedData'

export const USE_PROMOTED_DSOS_QUERY_KEY = 'promotedDSOs'

export const usePromotedDSOs = (): UsePaginatedQueryData<
  DigitalSecurityOffering
> => {
  const { apiService } = useServices()
  const uri = '/issuance/dso/list/approved'

  const getPromotedDSOs = async (queryKey: string, args: PaginationArgs) => {
    return await apiService.post<PaginatedData<DigitalSecurityOffering>>(
      uri,
      args
    )
  }
  const { data, ...queryResult } = useInfiniteQuery(
    [USE_PROMOTED_DSOS_QUERY_KEY, paginationArgs],
    getPromotedDSOs
  )

  return {
    ...queryResult,
    data: useParsedData<DigitalSecurityOffering>(data, '_id')
  }
}
