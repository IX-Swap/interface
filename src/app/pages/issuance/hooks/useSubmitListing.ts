import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { listings } from 'config/apiURL'
import { ListingView } from 'types/listing'

export const useSubmitListing = (listingId: string) => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const queryCache = useQueryCache()
  const url = listings.submitListing(getIdFromObj(user), listingId)
  const submitListing = async () => {
    return await apiService.patch<ListingView>(url, {})
  }

  return useMutation(submitListing, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries(exchangeQueryKeys.listing(listingId))
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
