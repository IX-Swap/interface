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
} from 'app/pages/exchange/types/listings'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'

export const useUpdateListing = (
  listingId: string,
  issuerId: string,
  callbacks?: QueryOrMutationCallbacks<ListingFormValuesForSubmit>
) => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useHistory()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const url = listingsURL.update(issuerId ?? userId, listingId)
  const updateDSO = async (args: ListingRequestArgs) => {
    const { network, ...rest } = args
    return await apiService.put<ListingFormValuesForSubmit>(url, rest)
  }

  return useMutation(updateDSO, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
      replace(
        generatePath(OTCMarketRoute.viewListing, {
          listingId: data.data._id
        })
      )

      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries([
        exchangeListingsQueryKeys.getListingById,
        listingId
      ])
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}
