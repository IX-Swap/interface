import { useInfiniteQuery } from 'react-query'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import { useAuth } from 'hooks/auth/useAuth'
import apiService from 'services/api'
import { PaginatedData } from 'services/api/types'
import { getIdFromObj } from 'helpers/strings'
import { useIsAdmin, useIsAuthorizer } from 'helpers/acl'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'
import { AuthorizableStatus } from 'types/util'
import { CorporateIdentity } from 'app/pages/_identity/types/forms'

export interface UseAllCorporatesArgs {
  all?: boolean
  status?: AuthorizableStatus
  type?: 'investor' | 'issuer'
}

export const useAllCorporates = (
  args: UseAllCorporatesArgs
): UsePaginatedQueryData<CorporateIdentity> => {
  const {
    all = false,
    status = 'Draft,Submitted,Approved,Rejected',
    type
  } = args
  const { user } = useAuth()
  const isAuthorizer = useIsAuthorizer()
  const isAdmin = useIsAdmin()
  const isSuperUser = isAdmin || isAuthorizer
  const userId = getIdFromObj(user)
  const payload = {
    ...paginationArgs,
    status
  }
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
