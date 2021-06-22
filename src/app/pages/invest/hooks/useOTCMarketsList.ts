import { useInfiniteQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { PaginatedData, PaginationArgs } from 'services/api/types'
import { paginationArgs } from 'config/defaults'
import { DigitalSecurityOffering } from 'types/dso'
import { useParsedData, UsePaginatedQueryData } from 'hooks/useParsedData'
import { otcQueryKeys } from 'config/queryKeys'
import { OTCUrl } from 'config/apiURL'

export const useOTCMarketsList = (
  filter?: string
): UsePaginatedQueryData<DigitalSecurityOffering> => {
  const { apiService } = useServices()

  const getOTCMarketsList = async (queryKey: string, args: PaginationArgs) => {
    // TODO Add interface for OTCMarket item
    return await apiService.post<PaginatedData<any>>(
      OTCUrl.getApprovedListingsList,
      args
    )
  }
  const { data, ...queryResult } = useInfiniteQuery(
    [
      otcQueryKeys.getApprovedListingsList,
      { ...paginationArgs, search: filter }
    ],
    getOTCMarketsList
  )

  return {
    ...queryResult,
    data: {
      ...useParsedData<any>(data, '_id')
    }
  }
}
