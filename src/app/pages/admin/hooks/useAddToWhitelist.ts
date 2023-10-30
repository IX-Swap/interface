import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { issuanceURL } from 'config/apiURL'
import { issuanceQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { AdminRoute } from 'app/pages/admin/router/config'
import { useHistory } from 'react-router-dom'

interface WhitelistWalletAddressArgs {
  address: string
  userId: string
  assetId: string
  label: string
}

export const useAddToWhitelist = () => {
  const { replace } = useHistory()
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const queryCache = useQueryCache()
  const url = issuanceURL.whitelist.addToWhitelist
  const addToWhitelist = async (args: WhitelistWalletAddressArgs) => {
    const { address, userId, assetId, label } = args
    return await apiService.post(url, {
      address,
      userId: userId !== '' ? userId : getIdFromObj(user),
      assetId,
      label
    })
  }

  return useMutation(addToWhitelist, {
    onSuccess: () => {
      replace(AdminRoute.whitelistWalletAddresses)
      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries(
        issuanceQueryKeys.getWhitelistedAddresses
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
