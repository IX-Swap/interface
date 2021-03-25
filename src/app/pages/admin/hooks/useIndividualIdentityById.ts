import { useQuery } from 'react-query'
import { UseQueryData } from 'hooks/useParsedData'
import { IndividualIdentity } from 'types/identity'
import apiService from 'services/api'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'

export const useIndividualIdentityById = (
  userId: string
): UseQueryData<IndividualIdentity> => {
  const getIndividual = async () => {
    const uri = identityURL.individuals.get(userId)
    return await apiService.get<IndividualIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getIndividual, { userId }],
    getIndividual
  )

  return {
    ...rest,
    data: data?.data
  }
}
