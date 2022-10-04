/* eslint-disable */
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { getIdFromObj, isEmptyString } from 'helpers/strings'
import { exchangeListingsQueryKeys } from 'config/queryKeys'
import { listingsURL } from 'config/apiURL'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { Listing } from 'app/pages/issuance/types/listings'

export const useListingById = (
  listingId?: string,
  issuerId?: string,
  UserId?: string,
  otcId?: string
) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const isListId = Boolean(listingId || issuerId)
  const url = isListId
    ? listingsURL.getById(issuerId ?? getIdFromObj(user), listingId)
    : listingsURL.getOTCListing(UserId, otcId)
  const fetchListing = async () => await apiService.get<Listing>(url)

  const { data, ...rest } = useQuery(
    isListId
      ? exchangeListingsQueryKeys.getListingById(
          listingId,
          issuerId ?? getIdFromObj(user)
        )
      : exchangeListingsQueryKeys.getListingById(
          UserId,
          otcId ?? getIdFromObj(user)
        ),
    fetchListing,
    {
      enabled: isListId
        ? !isEmptyString(listingId) && isValidDSOId(listingId)
        : !isEmptyString(UserId) && isValidDSOId(UserId)
    }
  )

  return {
    ...rest,
    data: data?.data
  }
}
