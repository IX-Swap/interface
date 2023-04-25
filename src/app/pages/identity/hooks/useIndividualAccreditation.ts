import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { isEmptyString } from 'helpers/strings'

export const useIndividualAccreditation = (identityId: string) => {
  const { apiService } = useServices()

  const uri = identityURL.individuals.accreditation.get(identityId)

  const fetcher = async () => {
    return await apiService.get<IndividualIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getIndividualAccreditation(identityId)],
    fetcher,
    { enabled: !isEmptyString(identityId) }
  )

  return {
    ...rest,
    data: data?.data
  }
}
