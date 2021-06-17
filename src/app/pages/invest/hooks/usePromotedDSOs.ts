import { useInfiniteQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { PaginatedData, PaginationArgs } from 'services/api/types'
import { paginationArgs } from 'config/defaults'
import { DigitalSecurityOffering } from 'types/dso'
import { useParsedData, UsePaginatedQueryData } from 'hooks/useParsedData'
import { dsoQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'

export const usePromotedDSOs = (
  filter?: string
): UsePaginatedQueryData<DigitalSecurityOffering> => {
  const { apiService } = useServices()

  const getPromotedDSOs = async (queryKey: string, args: PaginationArgs) => {
    return await apiService.post<PaginatedData<DigitalSecurityOffering>>(
      issuanceURL.dso.getAllPromoted,
      args
    )
  }
  const { data, ...queryResult } = useInfiniteQuery(
    [dsoQueryKeys.getPromoted, { ...paginationArgs, search: filter }],
    getPromotedDSOs
  )

  return {
    ...queryResult,
    data: {
      ...useParsedData<DigitalSecurityOffering>(data, '_id')
    }
  }
}
