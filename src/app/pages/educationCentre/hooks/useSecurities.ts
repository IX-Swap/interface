import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import { atlasOneURL } from 'config/apiURL'
import { atlasOneQueryKeys } from 'config/queryKeys'
import { hasValue } from 'helpers/forms'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { PaginatedData } from 'services/api/types'

export const trimToUndefined = (value: any) => {
  return hasValue(value) ? value : undefined
}

export const useSecurities = () => {
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()

  const assetClass = getFilterValue('assetClass')
  const industry = getFilterValue('industry')
  const country = getFilterValue('country')
  const status = getFilterValue('status')
  const protocol = getFilterValue('protocol')
  const search = getFilterValue('search')

  const filter = {
    assetClass: trimToUndefined(assetClass),
    industry: trimToUndefined(industry),
    country: trimToUndefined(country),
    status: trimToUndefined(status),
    search: trimToUndefined(search),
    protocol: trimToUndefined(protocol)
  }

  const getSecurities = async () => {
    return await apiService.post<PaginatedData<Security>>(
      atlasOneURL.getSecurities,
      filter
    )
  }

  const { data, ...rest } = useQuery(
    [atlasOneQueryKeys.getSecurities, filter],
    getSecurities
  )

  const securities = data?.data[0].documents
  return { ...rest, data: securities }
}
