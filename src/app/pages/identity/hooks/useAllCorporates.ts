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
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'

export interface UseAllCorporatesArgs {
  all?: boolean
  status?: AuthorizableStatus
  type?: CorporateType
  userId?: string
}

export const useAllCorporates = (
  args: UseAllCorporatesArgs
): UsePaginatedQueryData<CorporateIdentity> => {
  const {
    all = false,
    status = 'Draft,Submitted,Approved,Rejected',
    type,
    userId
  } = args
  const { user } = useAuth()
  const isAuthorizer = useIsAuthorizer()
  const isAdmin = useIsAdmin()
  const isSuperUser = isAdmin || isAuthorizer
  const authUserId = getIdFromObj(user)
  const payload = {
    ...paginationArgs,
    status
  }
  const uri =
    all && isSuperUser
      ? identityURL.corporates.getAllBySuperUser
      : identityURL.corporates.getAllByUserId(userId ?? authUserId)

  const getAllCorporates = async () => {
    return await apiService.post<PaginatedData<CorporateIdentity>>(uri, payload)
  }

  const { data, ...rest } = useInfiniteQuery(
    [identityQueryKeys.getAllCorporate, payload, userId ?? authUserId],
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
