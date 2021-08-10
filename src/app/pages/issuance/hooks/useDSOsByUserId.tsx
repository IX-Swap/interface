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
import { CapitalStructure } from 'app/pages/issuance/hooks/useDSOFilter'

export const useDSOsByUserId = (
  status?: string,
  onlyByUserId?: boolean,
  capitalStructure?: CapitalStructure
): UsePaginatedQueryData<DigitalSecurityOffering> => {
  const { user } = useAuth()
  const isAuthorizer = useIsAuthorizer()
  const userId = getIdFromObj(user)
  const uri =
    isAuthorizer && (onlyByUserId === undefined || !onlyByUserId)
      ? authorizerURL.offerings
      : issuanceURL.dso.getByUserId(userId)

  const getDSOsByUserId = async (_queryKey: string, args: any) => {
    return await apiService.post(uri, args)
  }

  const { data, ...rest } = useInfiniteQuery(
    [
      dsoQueryKeys.getDSOsById(
        onlyByUserId !== undefined && onlyByUserId ? userId : userId.concat('!')
      ),
      {
        ...paginationArgs,
        status: status,
        capitalStructure: capitalStructure
      }
    ],
    getDSOsByUserId,
    { enabled: (userId ?? '') !== '' }
  )

  return {
    ...rest,
    data: useParsedData<DigitalSecurityOffering>(data, '_id')
  }
}
