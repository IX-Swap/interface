import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { listingsURL } from 'config/apiURL'
import { generatePath, useHistory } from 'react-router-dom'
import {
  ListingFormValuesForSubmit,
  ListingRequestArgs
} from 'app/pages/issuance/types/listings'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { LISTING_TYPES } from '../consts/listing'

export const useCreateListing = (listingType: string | undefined) => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const { replace } = useHistory()
  const url = listingsURL.create(getIdFromObj(user))
  const createListing = async (args: ListingRequestArgs) => {
    return await apiService.post<ListingFormValuesForSubmit>(url, {
      ...args
    })
  }

  return useMutation(createListing, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
      if (listingType === LISTING_TYPES.EXCHANGE) {
        replace(
          generatePath(IssuanceRoute.viewListing, {
            listingId: data.data._id
          })
        )
      }
      if (listingType === LISTING_TYPES.OTC) {
        replace(
          generatePath(IssuanceRoute.viewOTCListing, {
            UserId: user?._id,
            OTCListingId: data.data._id
          })
        )
      }
      if (listingType === LISTING_TYPES.BOTH) {
        replace(
          generatePath(IssuanceRoute.viewOTCListing, {
            UserId: user?._id,
            OTCListingId: data?.data.result2._id
          })
        )
      }
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
