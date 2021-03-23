import { useQuery } from 'react-query'
import { UseQueryData } from 'hooks/useParsedData'
import { IndividualIdentity, GetIndividualIdentityArgs } from 'types/identity'
import apiService from 'services/api'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'

export const useIndividualIdentityById = (
  userId: string
): UseQueryData<IndividualIdentity> => {
  const payload = { userId }
  const getIndividual = async (
    queryKey: string,
    args: GetIndividualIdentityArgs
  ) => {
    const { userId } = args
    const uri = identityURL.individuals.get(userId)

    return await apiService.get<IndividualIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getIndividual, payload],
    getIndividual
  )

  return {
    ...rest,
    data: data?.data
  }
}
