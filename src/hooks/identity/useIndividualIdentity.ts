import { useQuery } from 'react-query'
import { UseQueryData } from 'hooks/useParsedData'
import { useAuth } from 'hooks/auth/useAuth'
import apiService from 'services/api'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'
import {
  GetIndividualIdentityArgs,
  IndividualIdentity
} from 'app/pages/_identity/types/forms'

export const useIndividualIdentity = (): UseQueryData<IndividualIdentity> => {
  const { user } = useAuth()
  const payload = { userId: user?._id }
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
