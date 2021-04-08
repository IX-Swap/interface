import { useQuery } from 'react-query'
import { UseQueryData } from 'hooks/useParsedData'
import { useAuth } from 'hooks/auth/useAuth'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useServices } from 'hooks/useServices'
import {
  GetIndividualIdentityArgs,
  IndividualIdentity
} from 'app/pages/identity/types/forms'

export const useIndividual = (): UseQueryData<IndividualIdentity> => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const userId = getIdFromObj(user)
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
