import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { isEmptyString } from 'helpers/strings'

export interface UseCorporateArgs {
  userId?: string
  identityId?: string
}

export const useCorporate = (args: UseCorporateArgs) => {
  const { userId, identityId } = args
  const { apiService } = useServices()

  const uri = identityURL.corporates.get(userId, identityId)

  const fetcher = async () => {
    return await apiService.get<CorporateIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getCorporate(userId, identityId)],
    fetcher,
    { enabled: !isEmptyString(userId) && !isEmptyString(identityId) }
  )

  console.log(data)

  return {
    ...rest,
    data: data?.data
  }
}
