import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apiService from 'services/apiService'
import { payout } from 'services/apiUrls'

import { AppDispatch, AppState } from '../index'
import { getMyPayoutList, getPayoutHistoryList } from './actions'

export const useTokenManagerState = () => {
  return useSelector<AppState, AppState['tokenManager']>((state) => state.tokenManager)
}

export const getMyPayout = async (params: Record<string, any>) => {
  const result = await apiService.get(payout.payoutsList, undefined, params)
  return result.data
}

export const useGetMyPayout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    payoutList: { page, offset },
  } = useTokenManagerState()

  const callback = useCallback(
    async (params: Record<string, any>) => {
      try {
        dispatch(getMyPayoutList.pending())
        const data = await getMyPayout({ page, offset, ...params })
        dispatch(getMyPayoutList.fulfilled(data))
        return data
      } catch (error: any) {
        dispatch(getMyPayoutList.rejected({ errorMessage: 'Could not get my payouts' }))
        return null
      }
    },
    [dispatch]
  )

  return callback
}

export const geyPayoutHistory = async (params: Record<string, any>) => {
  const result = await apiService.get(payout.payoutHistory, undefined, params)
  return result.data
}

export const useGeyPayoutHistory = () => {
  const dispatch = useDispatch<AppDispatch>()

  const callback = useCallback(
    async (params: Record<string, any>) => {
      try {
        dispatch(getPayoutHistoryList.pending())
        const data = await geyPayoutHistory(params)
        dispatch(getPayoutHistoryList.fulfilled(data))
        return data
      } catch (error: any) {
        dispatch(getPayoutHistoryList.rejected({ errorMessage: 'Could not get payout history' }))
        return null
      }
    },
    [dispatch]
  )

  return callback
}
