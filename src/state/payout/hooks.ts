import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'state'
import apiService from 'services/apiService'
import { payout } from 'services/apiUrls'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'

import { createDraft, getPayoutList } from './actions'

export function usePayoutState() {
  return useSelector<AppState, AppState['payout']>((state) => state.payout)
}

export const createDraftPayout = async (newPayoutDraft: any) => {
  const formData = new FormData()

  for (const key in newPayoutDraft) {
    if (key === 'files') {
      newPayoutDraft[key].forEach((item: any) => {
        formData.append(`${key}`, item)
      })
    } else {
      formData.append(key, newPayoutDraft[key])
    }
  }

  const result = await apiService.post(payout.createDraft, formData)
  return result.data
}

export function useCreateDraftPayout() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (newPayoutDraft: any) => {
      try {
        dispatch(createDraft.pending())
        const data = await createDraftPayout(newPayoutDraft)
        dispatch(createDraft.fulfilled(data))
        return data
      } catch (error: any) {
        dispatch(createDraft.rejected({ errorMessage: 'Could not create draft payout' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const getPayouts = async (params: Record<string, any>) => {
  const result = await apiService.get(payout.payoutsList, undefined, params)
  return result.data
}

export const useGetPayoutList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    list: { page, offset },
  } = usePayoutState()

  const callback = useCallback(
    async (params: Record<string, any>) => {
      try {
        dispatch(getPayoutList.pending())
        const data = await getPayouts({ page, offset, ...params })
        dispatch(getPayoutList.fulfilled({ data }))
        return data
      } catch (error: any) {
        dispatch(getPayoutList.rejected({ errorMessage: 'Could not get payouts' }))
        return null
      }
    },
    [dispatch]
  )

  return callback
}
