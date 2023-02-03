import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import apiService from 'services/apiService'
import { whitelist } from 'services/apiUrls'
import { WhitelistFilter } from 'services/types'
import { AppDispatch } from 'state'
import { useLoader } from 'state/launchpad/hooks'
import { InvestmentStage } from 'state/launchpad/types'
import { PaginateResponse } from 'types/pagination'
import { deleteWhitelistedWallet, getWhitelistedWallets, saveWhitelistedWallet } from './actions'
import { IssuanceDataExtract, IssuanceDataStatisticsDto, WhitelistWallet, WhitelistWalletPayload } from './types'

export interface UseDeleteWhitelistedArgs {
  onSuccess?: () => void
}
export type UseCreateWhitelistedArgs = UseDeleteWhitelistedArgs

export const useWhitelistWallet = ({ onSuccess }: UseCreateWhitelistedArgs) => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(async (offerId: string, data: WhitelistWalletPayload) => {
    dispatch(saveWhitelistedWallet.pending())
    try {
      await apiService.post(whitelist.add(offerId), data)
      onSuccess?.()
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

export interface UseDeleteWhitelistedArgs {
  onSuccess?: () => void
}
export const useDeleteWhitelisted = ({ onSuccess }: UseDeleteWhitelistedArgs) => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(async (offerId: string, walletAddress: string) => {
    dispatch(deleteWhitelistedWallet.pending())
    try {
      await apiService.delete(whitelist.delete(offerId, walletAddress), undefined)
      onSuccess?.()
      dispatch(deleteWhitelistedWallet.fulfilled())
    } catch (e) {
      dispatch(deleteWhitelistedWallet.rejected({ errorMessage: (e as { message: string }).message }))
    }
  }, [])
}

export const useGetOffersData = (offerId?: string) => {
  const loader = useLoader()
  const populateData = (data: IssuanceDataStatisticsDto) => {
    setData({ ...data, investments: data.investments.splice(0, 11) })
  }
  const [data, setData] = React.useState<IssuanceDataStatisticsDto>()
  const load = React.useCallback(() => {
    if (!offerId) {
      return
    }
    loader.start()
    return apiService
      .get(`offers/${offerId}/data`)
      .then((res) => res.data as IssuanceDataStatisticsDto)
      .then(populateData)
      .then(loader.stop)
  }, [offerId])

  useEffect(() => {
    load()
  }, [offerId])

  return { data, load, loading: loader.isLoading }
}
