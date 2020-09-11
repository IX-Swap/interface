import { useInfiniteQuery } from 'react-query'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import { identityService } from 'v2/services/identity'
import { CorporateIdentity } from 'v2/types/identity'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const ALL_CORPORATE_IDENTITIES_QUERY_KEY = 'allCorporateIdentities'

export const useAllCorporateIdentities = (): UsePaginatedQueryData<
  CorporateIdentity
> => {
  const { user } = useAuth()
  const payload = { ...paginationArgs, userId: user?._id }
  const { data, ...rest } = useInfiniteQuery(
    [ALL_CORPORATE_IDENTITIES_QUERY_KEY, payload],
    identityService.getAllCorporates.bind(identityService)
  )

  return {
    ...rest,
    data: useParsedData<CorporateIdentity>(data, '_id')
  }
}
