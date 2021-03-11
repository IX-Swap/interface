import { useInfiniteQuery } from 'react-query'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import { CorporateIdentity } from 'types/identity'
import { useAuth } from 'hooks/auth/useAuth'
import apiService from 'services/api'
import { PaginatedData } from 'services/api/types'
import { getIdFromObj } from 'helpers/strings'
import { useIsAdmin, useIsAuthorizer } from 'helpers/acl'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'

export const useAllCorporateIdentities = (
  all = false
): UsePaginatedQueryData<CorporateIdentity> => {
  const { user } = useAuth()
  const isAuthorizer = useIsAuthorizer()
  const isAdmin = useIsAdmin()
  const isSuperUser = isAdmin || isAuthorizer
  const userId = getIdFromObj(user)
  const payload = { ...paginationArgs, status: 'Draft' }
  const uri =
    all && isSuperUser
      ? identityURL.corporates.getAllBySuperUser
      : identityURL.corporates.getAllByUserId(userId)

  const getAllCorporates = async () => {
    return await apiService.post<PaginatedData<CorporateIdentity>>(uri, payload)
  }

  const { data, ...rest } = useInfiniteQuery(
    [identityQueryKeys.getAllCorporate, payload],
    getAllCorporates
  )

  return {
    ...rest,
    data: useParsedData<CorporateIdentity>(data, '_id')
  }
}
