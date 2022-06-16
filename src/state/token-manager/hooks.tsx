import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apiService from 'services/apiService'
import { tokenManager } from 'services/apiUrls'

import { AppDispatch, AppState } from '../index'
import { getMyPayoutList } from './actions'

export const useTokenManagerState = () => {
  return useSelector<AppState, AppState['tokenManager']>((state) => state.tokenManager)
}

export const getMyPayout = async (params: Record<string, any>) => {
  const result = await apiService.get(tokenManager.myPayouts, undefined, params)
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
