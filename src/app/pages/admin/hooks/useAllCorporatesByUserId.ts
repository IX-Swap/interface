import { useInfiniteQuery } from 'react-query'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { PaginatedData } from 'services/api/types'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'
import { AuthorizableStatus } from 'types/util'
import { CorporateIdentity } from '../../identity/types/forms'

export interface UseAllCorporatesArgs {
  userId?: string
  status?: AuthorizableStatus
  type?: 'investor' | 'issuer'
}

export const useAllCorporatesByUserId = (
  args: UseAllCorporatesArgs
): UsePaginatedQueryData<CorporateIdentity> => {
  const { userId, status = 'Draft,Submitted,Approved,Rejected', type } = args

  const payload = {
    ...paginationArgs,
    status
  }
  const uri = identityURL.corporates.getAllByUserId(userId)

  const getAllCorporates = async () => {
    return await apiService.post<PaginatedData<CorporateIdentity>>(uri, payload)
  }

  const { data, ...rest } = useInfiniteQuery(
    [identityQueryKeys.getAllCorporateByUserId(userId), payload],
    getAllCorporates,
    {
      enabled: !!userId
    }
  )

  const parsedData = useParsedData<CorporateIdentity>(data, '_id')

  return {
    ...rest,
    data: {
      ...parsedData,
      list:
        type !== undefined
          ? parsedData.list.filter(identity => identity.type === type)
          : parsedData.list
    }
  }
}
