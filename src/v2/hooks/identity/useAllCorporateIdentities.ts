import { useInfiniteQuery } from 'react-query'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import { CorporateIdentity, GetIndividualIdentityArgs } from 'v2/types/identity'
import { useAuth } from 'v2/hooks/auth/useAuth'
import apiService from 'v2/services/api'
import { PaginatedData } from 'v2/services/api/types'

export const ALL_CORPORATE_IDENTITIES_QUERY_KEY = 'allCorporateIdentities'

export const useAllCorporateIdentities = (): UsePaginatedQueryData<
  CorporateIdentity
> => {
  const { user } = useAuth()
  const payload = { ...paginationArgs, userId: user?._id }
  const getAllCorporates = async (
    queryKey: string,
    args: GetIndividualIdentityArgs
  ) => {
    const { userId } = args
    const uri = `/identity/corporates/${userId}/list`

    return await apiService.post<PaginatedData<CorporateIdentity>>(
      uri,
      paginationArgs
    )
  }

  const { data, ...rest } = useInfiniteQuery(
    [ALL_CORPORATE_IDENTITIES_QUERY_KEY, payload],
    getAllCorporates
  )

  return {
    ...rest,
    data: useParsedData<CorporateIdentity>(data, '_id')
  }
}
