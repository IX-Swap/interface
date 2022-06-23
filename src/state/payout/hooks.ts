import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { AppDispatch, AppState } from 'state'
import apiService from 'services/apiService'
import { payout } from 'services/apiUrls'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'

import { createDraft, getPayoutList, getPayoutItem as getPayoutItemAction, getMyPayoutList } from './actions'

export function usePayoutState() {
  return useSelector<AppState, AppState['payout']>((state) => state.payout)
}

const getPayoutItem = async (id: number) => {
  const result = await apiService.get(payout.payoutById(id))
  return result.data
}

const publishPayout = async (newPayoutDraft: any) => {
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

  const result = await apiService.post(payout.publish, formData)
  return result.data
}

const createDraftPayout = async (newPayoutDraft: any) => {
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

export function usePublishPayout() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (newPayoutDraft: any) => {
      try {
        dispatch(createDraft.pending())
        const data = await publishPayout(newPayoutDraft)
        dispatch(createDraft.fulfilled(data))
        return data
      } catch (error: any) {
        dispatch(createDraft.rejected({ errorMessage: 'Could not publish payout' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
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

export function useGetPayoutItem() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(getPayoutItemAction.pending())
        const data = await getPayoutItem(id)
        dispatch(getPayoutItemAction.fulfilled(data))
        return data
      } catch (error: any) {
        dispatch(getPayoutItemAction.rejected({ errorMessage: 'Could not get payout item' }))
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

export const getPayoutClaims = async (payoutId: number, params: Record<string, any>) => {
  const result = await apiService.get(payout.claims(payoutId), undefined, params)
  return result.data
}

export const getTotalAmountByRecordDate = async (tokenId: number, recordDate: any) => {
  const result = await apiService.get(payout.totalAmount(tokenId, moment(new Date(recordDate)).format('YYYY-MM-DD')))
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

interface MyPayoutsParams {
  listType: string
  [key: string]: string | number
}

export const getMyPayouts = async (params: MyPayoutsParams) => {
  const result = await apiService.get(payout.myPayoutsList, undefined, params)
  return result.data
}

export const useGetMyPayoutList = () => {
  const dispatch = useDispatch<AppDispatch>()

  const callback = useCallback(
    async ({ listType, ...params }: MyPayoutsParams) => {
      try {
        dispatch(getMyPayoutList.pending())
        const data = await getMyPayouts({ listType, ...params })
        dispatch(getMyPayoutList.fulfilled({ data, type: listType }))
        return data
      } catch (error: any) {
        dispatch(getMyPayoutList.rejected({ errorMessage: 'Could not get payouts list' }))
        return null
      }
    },
    [dispatch]
  )

  return callback
}
