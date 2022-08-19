import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { AppDispatch, AppState } from 'state'
import apiService from 'services/apiService'
import { payout } from 'services/apiUrls'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'
import { useHistory, useLocation } from 'react-router-dom'
import { routes } from 'utils/routes'

import {
  createDraft,
  getPayoutList,
  getPayoutItem as getPayoutItemAction,
  getMyPayoutList,
  deletePayoutItem,
  saveUserClaim,
  getUserClaim,
  getTotalClaims,
} from './actions'
import { useAddPopup } from 'state/application/hooks'
import { useGetMyPayout, useTokenManagerState } from 'state/token-manager/hooks'
import { BigNumber } from 'ethers'

interface PayPayoutDto {
  contractPayoutId: string
  paidTxHash: string
}

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

export const paidPayoutReq = async (id: number, params: PayPayoutDto) => {
  const result = await apiService.put(payout.paidPayout(id), params)
  return result.data
}

export function useDeleteDraftPayout() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (id: number) => {
      try {
        dispatch(createDraft.pending())
        const data = await apiService.delete(`${payout.createDraft}/${id}`, null)
        dispatch(createDraft.fulfilled(data))
      } catch (error: any) {
        dispatch(createDraft.rejected({ errorMessage: error }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
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
        dispatch(createDraft.rejected({ errorMessage: error }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function usePaidPayout() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (id: number, paidPayoutData: any) => {
      try {
        dispatch(createDraft.pending())
        const data = await paidPayoutReq(id, paidPayoutData)
        dispatch(createDraft.fulfilled(data))
        return data
      } catch (error: any) {
        dispatch(createDraft.rejected({ errorMessage: error }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

const getPayoutPayload = async (payoutData: any) => {
  const formData = new FormData()

  for (const key in payoutData) {
    if (key === 'files') {
      for (const item of payoutData[key]) {
        if (item.id) {
          formData.append(`${key}`, JSON.stringify(item))
        } else {
          formData.append(`${key}`, item)
        }
      }
    } else {
      if (['secToken', 'token'].includes(key) && payoutData[key].value) {
        formData.append(key, payoutData[key].value)
      } else {
        formData.append(key, payoutData[key])
      }
    }
  }

  return formData
}

const createDraftPayout = async (newPayoutDraft: any) => {
  const result = await apiService.post(payout.createDraft, await getPayoutPayload(newPayoutDraft))
  return result.data
}

const updateDraftPayout = async (id: number, newPayoutDraft: any, oldPayout: any) => {
  const removed = oldPayout['files']
    .filter((f: any) => !f.id || !newPayoutDraft['files'].find((ff: any) => ff.id === f.id))
    .map((f: any) => f.id)

  newPayoutDraft['files'] = newPayoutDraft['files'].filter(
    (f: any) => f.id || !removed.find((ff: any) => ff.id === f.id)
  )

  const payload = await getPayoutPayload(newPayoutDraft)
  payload.append('removedAttachments', JSON.stringify(removed))

  const result = await apiService.put(`${payout.createDraft}/${id}`, payload)
  return result.data
}

const updatePayout = async (id: number, newPayoutDraft: any, oldPayout: any) => {
  const removed = oldPayout['files']
    .filter((f: any) => !newPayoutDraft['files'].find((ff: any) => ff.id === f.id))
    .map((f: any) => f.id)

  newPayoutDraft['files'] = newPayoutDraft['files'].filter(
    (f: any) => !f.id || !removed.find((ff: any) => ff.id === f.id)
  )

  const payload = await getPayoutPayload(newPayoutDraft)

  payload.append('removedAttachments', JSON.stringify(removed))

  const result = await apiService.post(`${payout.publish}`, payload)
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
        dispatch(createDraft.rejected({ errorMessage: error }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function useUpdateDraftPayout() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (id: number, newPayoutDraft: any, old: any) => {
      try {
        dispatch(createDraft.pending())
        const data = await updateDraftPayout(id, newPayoutDraft, old)
        dispatch(createDraft.fulfilled(data))
        return data
      } catch (error: any) {
        dispatch(createDraft.rejected({ errorMessage: error }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function useUpdatePayout() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (id: number, newPayoutDraft: any, old: any) => {
      try {
        dispatch(createDraft.pending())
        const data = await updatePayout(id, newPayoutDraft, old)
        dispatch(createDraft.fulfilled(data))
        return data
      } catch (error: any) {
        dispatch(createDraft.rejected({ errorMessage: error }))
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
  const {
    list: { page, offset },
  } = usePayoutState()
  const callback = useCallback(
    async ({ listType, ...params }: MyPayoutsParams) => {
      try {
        dispatch(getMyPayoutList.pending())
        const data = await getMyPayouts({ page, offset, listType, ...params })
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

export const deletePayoutItemReq = async (id: number) => {
  const result = await apiService.delete(payout.deleteDraft(id), undefined)
  return result.data
}

export const useDeletePayoutItem = () => {
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory()
  const location = useLocation()
  const addPopup = useAddPopup()
  const getMyPayout = useGetMyPayout()
  const {
    payoutList: { items, page },
  } = useTokenManagerState()

  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(deletePayoutItem.pending())
        const data = await deletePayoutItemReq(id)
        dispatch(deletePayoutItem.fulfilled())

        addPopup({
          info: {
            success: true,
            summary: 'Payout event was successfully deleted.',
          },
        })

        if (location.pathname === routes.createPayoutEvent) {
          history.push({ pathname: routes.tokenManager('payout-events', null) })
        } else {
          getMyPayout({ my: true, page: items.length === 1 ? page - 1 : page })
        }

        return data
      } catch (error: any) {
        dispatch(deletePayoutItem.rejected({ errorMessage: 'Could not delete payout item' }))
        return null
      }
    },
    [dispatch]
  )

  return callback
}

export const getMyPayoutAmount = async (id: number) => {
  const result = await apiService.get(payout.getMyPayoutAmount(id))
  return result.data
}

interface GetClaimAuthorization {
  token: string
  nonce: number
  deadline: string
  id: number
}

export const getClaimAuthorization = async ({ id, ...params }: GetClaimAuthorization) => {
  const result = await apiService.post(payout.claimAuthorization(id), params)
  return result.data
}

export const getClaimBackAuthorization = async ({ id, ...params }: GetClaimAuthorization) => {
  const result = await apiService.post(payout.claimBackAuthorization(id), params)
  return result.data
}

interface SaveUserClaim {
  payoutEventId: number
  secToken: number
  sum: string
  txHash: string
}

export const saveUserClaimReq = async (params: SaveUserClaim) => {
  const result = await apiService.post(payout.saveUserClaim, params)
  return result.data
}

export const useSaveUserClaim = () => {
  const dispatch = useDispatch<AppDispatch>()
  const addPopup = useAddPopup()

  const callback = useCallback(
    async (params: SaveUserClaim) => {
      try {
        dispatch(saveUserClaim.pending())
        const data = await saveUserClaimReq(params)
        dispatch(saveUserClaim.fulfilled())

        addPopup({
          info: {
            success: true,
            summary: 'Successfully claimed.',
          },
        })

        return data
      } catch (error: any) {
        dispatch(saveUserClaim.rejected({ errorMessage: 'Could not claim' }))
        return null
      }
    },
    [dispatch]
  )

  return callback
}

export const saveManagerClaimBackReq = async (params: SaveUserClaim) => {
  const result = await apiService.post(payout.saveManagerClaimBack, params)
  return result.data
}

export const useSaveManagerClaimBack = () => {
  const dispatch = useDispatch<AppDispatch>()
  const addPopup = useAddPopup()

  return useCallback(
    async (params: SaveUserClaim) => {
      try {
        dispatch(saveUserClaim.pending())
        const data = await saveManagerClaimBackReq(params)
        dispatch(saveUserClaim.fulfilled())

        addPopup({
          info: {
            success: true,
            summary: 'Successfully claimed.',
          },
        })

        return data
      } catch (error: any) {
        dispatch(saveUserClaim.rejected({ errorMessage: 'Could not claim' }))
        return null
      }
    },
    [dispatch]
  )
}

export const getUserClaimReq = async (id: number) => {
  const result = await apiService.get(payout.getUserClaim(id))
  return result.data
}

export const getTotalClaimsReq = async (id: number) => {
  const result = await apiService.get(payout.getTotalClaims(id))
  return result.data
}

export const useGetUserClaim = () => {
  const dispatch = useDispatch<AppDispatch>()

  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(getUserClaim.pending())
        const data = await getUserClaimReq(id)
        dispatch(getUserClaim.fulfilled())

        return data
      } catch (error: any) {
        dispatch(getUserClaim.rejected({ errorMessage: 'Could not get claim' }))
        return null
      }
    },
    [dispatch]
  )

  return callback
}

export const useGetTotalClaims = () => {
  const dispatch = useDispatch<AppDispatch>()

  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(getTotalClaims.pending())
        const data = await getTotalClaimsReq(id)
        dispatch(getTotalClaims.fulfilled())

        return data
      } catch (error: any) {
        dispatch(getTotalClaims.rejected({ errorMessage: 'Could not get claim' }))
        return null
      }
    },
    [dispatch]
  )

  return callback
}

const getRemainingTokens = async (id: number) => {
  const result = await apiService.get(payout.getRemainingTokens(id))
  return result.data
}

export const useGetRemainingTokens = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (id: number) => {
      try {
        dispatch(getTotalClaims.pending())
        const data = await getRemainingTokens(id)
        dispatch(getTotalClaims.fulfilled())

        return data
      } catch (error: any) {
        dispatch(getTotalClaims.rejected({ errorMessage: 'Could not get claim' }))
        return null
      }
    },
    [dispatch]
  )
}
