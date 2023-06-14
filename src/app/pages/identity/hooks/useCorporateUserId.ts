import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { isEmptyString } from 'helpers/strings'

export interface UseCorporateUserIdArgs {
  userId?: string
}

export const UseCorporateUserId = (args: UseCorporateUserIdArgs) => {
  const { userId } = args
  const { apiService } = useServices()

  const uri = identityURL.corporates.getByUserId(userId)

  const fetcher = async () => {
    return await apiService.get<CorporateIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getCorporate(userId)],
    fetcher,
    { enabled: !isEmptyString(userId) }
  )

  return {
    ...rest,
    corporateData: data
  }
}
