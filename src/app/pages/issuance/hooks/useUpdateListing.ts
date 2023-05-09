import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { queryCache, useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { exchangeListingsQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { listingsURL } from 'config/apiURL'
import { generatePath, useHistory } from 'react-router-dom'
import {
  ListingFormValuesForSubmit,
  ListingRequestArgs
} from 'app/pages/issuance/types/listings'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { LISTING_TYPES } from '../consts/listing'

export const useUpdateListing = (
  listingId: string,
  issuerId: string,
  listingType: string | undefined,
  callbacks?: QueryOrMutationCallbacks<ListingFormValuesForSubmit>
) => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useHistory()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const url = listingsURL.create(issuerId ?? userId)
  const updateDSO = async (args: ListingRequestArgs) => {
    return await apiService.post<ListingFormValuesForSubmit>(url, {
      ...args,
      listingId: listingId
    })
  }

  return useMutation(updateDSO, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
      replace(
        listingType === LISTING_TYPES.OTC
          ? generatePath(IssuanceRoute.previewOTCListing, {
              OTCListingId: data.data._id,
              UserId: data.data.user._id
            })
          : generatePath(IssuanceRoute.viewListing, {
              listingId:
                listingType === LISTING_TYPES.BOTH
                  ? data.data.result.id
                  : data.data._id
            })
      )

      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries(
        exchangeListingsQueryKeys.getListingById(listingId, issuerId)
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}