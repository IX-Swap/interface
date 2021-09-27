import { useInfiniteQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { dsoQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { paginationArgs } from 'config/defaults'
import { useParsedData } from 'hooks/useParsedData'
import { DigitalSecurityOffering } from 'types/dso'

export const useDSOList = (dealStatus?: 'Closed' | 'Open') => {
  const { apiService } = useServices()
  const url = issuanceURL.dso.getDSOList
  const fetchDSOList = async (_queryKey: string, args: any) => {
    return await apiService.post(url, {
      ...paginationArgs,
      dealStatus: dealStatus
    })
  }

  const { data, ...rest } = useInfiniteQuery(
    [
      dsoQueryKeys.getList,
      dealStatus,
      {
        ...paginationArgs
      }
    ],
    fetchDSOList
  )

  return {
    ...rest,
    data: useParsedData<DigitalSecurityOffering>(data, '_id')
  }
}
