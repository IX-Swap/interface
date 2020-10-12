import { useQuery } from 'react-query'
import { UseQueryData } from 'v2/hooks/useParsedData'
import {
  IndividualIdentity,
  GetIndividualIdentityArgs
} from 'v2/types/identity'
import { useAuth } from 'v2/hooks/auth/useAuth'
import apiService from 'v2/services/api'

export const INDIVIDUAL_IDENTITY_QUERY_KEY = 'individualIdentity'

export const useIndividualIdentity = (): UseQueryData<IndividualIdentity> => {
  const { user } = useAuth()
  const payload = { userId: user?._id }
  const getIndividual = async (
    queryKey: string,
    args: GetIndividualIdentityArgs
  ) => {
    const { userId } = args
    const uri = `/identity/individuals/${userId}`

    return await apiService.get<IndividualIdentity>(uri)
  }

  const { data, ...rest } = useQuery(
    [INDIVIDUAL_IDENTITY_QUERY_KEY, payload],
    getIndividual
  )

  return {
    ...rest,
    data: data?.data
  }
}
