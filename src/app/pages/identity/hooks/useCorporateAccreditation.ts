import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { isEmptyString } from 'helpers/strings'

export const useCorporateAccreditation = (identityId: string) => {
  const { apiService } = useServices()

  const uri = identityURL.corporates.accreditation.get(identityId)

  const fetcher = async () => {
    return await apiService.get<CorporateIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getCorporateAccreditation(identityId)],
    fetcher,
    { enabled: !isEmptyString(identityId) }
  )

  return {
    ...rest,
    data: data?.data
  }
}
