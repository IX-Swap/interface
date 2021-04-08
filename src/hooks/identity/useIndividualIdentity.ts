import { useQuery } from 'react-query'
import { UseQueryData } from 'hooks/useParsedData'
import { useAuth } from 'hooks/auth/useAuth'
import apiService from 'services/api'
import { identityQueryKeys } from 'config/queryKeys'
import { identityURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { IndividualIdentity } from '../../app/pages/_identity/types/forms'

export const useIndividualIdentity = (
  userId?: string
): UseQueryData<IndividualIdentity> => {
  const { user } = useAuth()

  const getIndividual = async (queryKey: string, userId: string) => {
    const uri = identityURL.individuals.get(userId)

    return await apiService.get<IndividualIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [identityQueryKeys.getIndividual, userId ?? getIdFromObj(user)],
    getIndividual
  )

  return {
    ...rest,
    data: data?.data
  }
}
