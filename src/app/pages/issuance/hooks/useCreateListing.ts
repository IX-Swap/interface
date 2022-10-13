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

export const useCreateListing = () => {
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

      replace(
        generatePath(IssuanceRoute.viewListing, {
          listingId: data.data._id
        })
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
