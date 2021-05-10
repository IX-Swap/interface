import { useInfiniteQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { dsoQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { authorizerURL, issuanceURL } from 'config/apiURL'
import { DigitalSecurityOffering } from 'types/dso'
import { useIsAuthorizer } from 'helpers/acl'

export const useDSOsByUserId = (): UsePaginatedQueryData<DigitalSecurityOffering> => {
  const { user } = useAuth()
  const isAuthorizer = useIsAuthorizer()
  const userId = getIdFromObj(user)
  const uri = isAuthorizer
    ? authorizerURL.offerings
    : issuanceURL.dso.getByUserId(userId)

  const getDSOsByUserId = async (_queryKey: string, args: any) => {
    return await apiService.post(uri, args)
  }

  const { data, ...rest } = useInfiniteQuery(
    [
      dsoQueryKeys.getDSOsById(userId),
      { ...paginationArgs, status: 'Draft,Approved,Submitted,Rejected' }
    ],
    getDSOsByUserId,
    { enabled: (userId ?? '') !== '' }
  )

  return {
    ...rest,
    data: useParsedData<DigitalSecurityOffering>(data, '_id')
  }
}
