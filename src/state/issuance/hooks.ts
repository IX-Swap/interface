import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import apiService from 'services/apiService'
import { whitelist } from 'services/apiUrls'
import { WhitelistFilter } from 'services/types'
import { AppDispatch } from 'state'
import { PaginateResponse } from 'types/pagination'
import { deleteWhitelistedWallet, getWhitelistedWallets, saveWhitelistedWallet } from './actions'
import { WhitelistWallet, WhitelistWalletPayload } from './types'

export const useWhitelistWallet = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(async (offerId: string, data: WhitelistWalletPayload) => {
    dispatch(saveWhitelistedWallet.pending())
    try {
      await apiService.post(whitelist.add(offerId), data)

      dispatch(saveWhitelistedWallet.fulfilled())
    } catch (e) {
      dispatch(saveWhitelistedWallet.rejected({ errorMessage: (e as { message: string }).message }))
    }
  }, [])
}

export const useGetWhitelisted = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(async (offerId: string, filters: WhitelistFilter) => {
    dispatch(getWhitelistedWallets.pending())
    try {
      const result = await apiService.get(whitelist.get(offerId), undefined, filters)

      dispatch(getWhitelistedWallets.fulfilled({ data: result.data as PaginateResponse<WhitelistWallet> }))
    } catch (e) {
      dispatch(getWhitelistedWallets.rejected({ errorMessage: (e as { message: string }).message }))
    }
  }, [])
}

export const useDeleteWhitelisted = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(async (offerId: string, walletAddress: string) => {
    dispatch(deleteWhitelistedWallet.pending())
    try {
      await apiService.delete(whitelist.delete(offerId, walletAddress), undefined)
      dispatch(deleteWhitelistedWallet.fulfilled())
    } catch (e) {
      dispatch(deleteWhitelistedWallet.rejected({ errorMessage: (e as { message: string }).message }))
    }
  }, [])
}
