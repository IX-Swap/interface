import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export type TopCorporates = Array<
  Pick<CorporateIdentity, 'logo' | 'companyLegalName' | '_id'>
>

export const useTopCorporates = () => {
  const { apiService } = useServices()
  const uri = homeURL.getTopCorporates

  const getTopCorporates = async () => {
    return await apiService.get<TopCorporates>(uri, {})
  }
  const { data, ...queryResult } = useQuery(
    homeQueryKeys.getTopCoporates,
    getTopCorporates
  )

  return {
    ...queryResult,
    data: data?.data
  }
}
