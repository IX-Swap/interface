import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'state'
import apiService from 'services/apiService'
import { broker } from 'services/apiUrls'

import { getBrokerDealers } from './actions'

export enum BROKER_DEALERS_STATUS {
  SUCCESS,
  FAILED,
}

export function useBrokerDealersState(): AppState['brokerDealer'] {
  return useSelector<AppState, AppState['brokerDealer']>((state) => state.brokerDealer)
}

export const getBrokerDealerPairs = async ({ tokenId }: { tokenId: number }) => {
  const result = await apiService.get(broker.pairs(tokenId))
  return result.data
}

export function useFetchBrokerDealers() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (tokenId: number) => {
      try {
        dispatch(getBrokerDealers.pending())
        const data = await getBrokerDealerPairs({ tokenId })
        dispatch(getBrokerDealers.fulfilled({ data }))
        return BROKER_DEALERS_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(getBrokerDealers.rejected({ errorMessage: 'Could not fetch broker dealers and custodians' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const useClearBrokerDealers = () => {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(() => {
    dispatch(getBrokerDealers.fulfilled({ data: [] }))
  }, [dispatch])
  return callback
}
