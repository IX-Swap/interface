import { useInfiniteQuery } from 'react-query'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import { CorporateIdentity } from 'v2/types/identity'
import { useAuth } from 'v2/hooks/auth/useAuth'
import apiService from 'v2/services/api'
import { PaginatedData } from 'v2/services/api/types'
import { getIdFromObj } from 'v2/helpers/strings'
import { useIsAdmin, useIsAuthorizer } from 'v2/helpers/acl'

export const ALL_CORPORATE_IDENTITIES_QUERY_KEY = 'allCorporateIdentities'

export const useAllCorporateIdentities = (
  all = false
): UsePaginatedQueryData<CorporateIdentity> => {
  const { user } = useAuth()
  const isAuthorizer = useIsAuthorizer()
  const isAdmin = useIsAdmin()
  const isSuperUser = isAdmin || isAuthorizer
  const userId = getIdFromObj(user)
  const payload = { ...paginationArgs, userId }
  const uri =
    all && isSuperUser
      ? '/identity/corporates/list'
      : `/identity/corporates/${userId}/list`
  const getAllCorporates = async () => {
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
