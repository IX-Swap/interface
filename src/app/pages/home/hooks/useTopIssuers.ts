import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export type TopIssuers = Array<
  Pick<
    IndividualIdentity,
    '_id' | 'firstName' | 'middleName' | 'lastName' | 'photo' | 'user'
  >
>

export const useTopIssuers = () => {
  const { apiService } = useServices()
  const uri = homeURL.getTopIssuers

  const getBanks = async () => {
    return await apiService.get<TopIssuers>(uri, {})
  }
  const { data, ...queryResult } = useQuery(
    homeQueryKeys.getTopIssuers,
    getBanks
  )

  return {
    ...queryResult,
    data: data?.data
  }
}
