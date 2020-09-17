import { useQuery } from 'react-query'
import { UseQueryData } from 'v2/hooks/useParsedData'
import { identityService } from 'v2/services/identity'
import { IndividualIdentity } from 'v2/types/identity'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const INDIVIDUAL_IDENTITY_QUERY_KEY = 'individualIdentity'

export const useIndividualIdentity = (): UseQueryData<IndividualIdentity> => {
  const { user } = useAuth()
  const payload = { userId: user?._id }
  const { data, ...rest } = useQuery(
    [INDIVIDUAL_IDENTITY_QUERY_KEY, payload],
    identityService.getIndividual.bind(identityService)
  )

  return {
    ...rest,
    data: data?.data
  }
}
