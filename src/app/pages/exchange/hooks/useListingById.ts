import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { getIdFromObj, isEmptyString } from 'helpers/strings'
import { exchangeListingsQueryKeys } from 'config/queryKeys'
import { listingsURL } from 'config/apiURL'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { Listing } from 'app/pages/exchange/types/listings'

export const useListingById = (listingId?: string, issuerId?: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = listingsURL.getById(issuerId ?? getIdFromObj(user), listingId)
  const fetchListing = async () => await apiService.get<Listing>(url)
  const { data, ...rest } = useQuery(
    exchangeListingsQueryKeys.getListingById(
      listingId,
      issuerId ?? getIdFromObj(user)
    ),
    fetchListing,
    { enabled: !isEmptyString(listingId) && isValidDSOId(listingId) }
  )

  return {
    ...rest,
    data: data?.data
  }
}
