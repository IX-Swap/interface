import { useQuery } from 'react-query'
import { UseQueryData } from 'hooks/useParsedData'
import apiService from 'services/api'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { isEmptyString } from 'helpers/strings'

export const useIndividualIdentityById = (
  userId?: string
): UseQueryData<IndividualIdentity> => {
  const getIndividual = async () => {
    const uri = identityURL.individuals.get(userId)
    return await apiService.get<IndividualIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getIndividual, { userId }],
    getIndividual,
    { enabled: !isEmptyString(userId) }
  )

  return {
    ...rest,
    data: data?.data
  }
}
