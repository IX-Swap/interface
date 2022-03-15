import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import apiService from 'services/apiService'
import { admin } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import {
  getBrokerDealerList,
  getBrokerDealerSwaps,
  getAccreditationList,
  getMe,
  logout,
  postApproveAccreditation,
  postDeclineAccreditation,
  postResetAccreditation,
  getKycList,
  postApproveKyc,
  postRejectKyc,
  postResetKyc,
} from './actions'

export enum BROKER_DEALERS_STATUS {
  SUCCESS,
  FAILED,
}

export enum STATUS {
  SUCCESS,
  FAILED,
}

export enum LOGIN_STATUS {
  SUCCESS,
  FAILED,
}

export enum GET_ME_STATUS {
  SUCCESS,
  FAILED,
}

export enum LOGOUT_STATUS {
  SUCCESS,
  FAILED,
}

export enum ACCREDITATION_LIST_STATUS {
  SUCCESS,
  FAILED,
}

export enum KYC_LIST_STATUS {
  SUCCESS,
  FAILED,
}

export function useAdminState(): AppState['admin'] {
  return useSelector<AppState, AppState['admin']>((state) => state.admin)
}

export const me = async () => {
  const result = await apiService.get(admin.me)
  return result.data
}

export function useGetMe() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(async () => {
    try {
      dispatch(getMe.pending())
      const data = await me()
      dispatch(getMe.fulfilled({ data }))
      return data
    } catch (error: any) {
      dispatch(getMe.rejected({ errorMessage: 'Could not get me' }))
      return null
    }
  }, [dispatch])
  return callback
}

export function useLogout() {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(() => {
    try {
      dispatch(logout.fulfilled())
      history.push('/swap')
      return LOGOUT_STATUS.SUCCESS
    } catch (error: any) {
      return LOGOUT_STATUS.FAILED
    }
  }, [dispatch, history])
  return callback
}

export const getAccreditation = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(admin.accreditationList, undefined, params)
  return result.data
}

export const getBrokerDealers = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(admin.brokerDealerList, undefined, params)
  return result.data
}

export const getBrokerDealerAllSwaps = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(admin.getSwaps, undefined, params)
  return result.data
}

export function useGetAccreditationList() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(getAccreditationList.pending())
        const data = await getAccreditation(params)
        dispatch(getAccreditationList.fulfilled({ data }))
        return ACCREDITATION_LIST_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(getAccreditationList.rejected({ errorMessage: 'Could not get accreditation list' }))
        return ACCREDITATION_LIST_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function useBrokerDealerList() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(getBrokerDealerList.pending())
        const data = await getBrokerDealers(params)
        dispatch(getBrokerDealerList.fulfilled({ data }))
        return ACCREDITATION_LIST_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(getBrokerDealerList.rejected({ errorMessage: 'Could not get broker dealer list' }))
        return ACCREDITATION_LIST_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function useFetchBrokerDealerSwaps() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(getBrokerDealerSwaps.pending())
        const data = await getBrokerDealerAllSwaps(params)
        dispatch(getBrokerDealerSwaps.fulfilled({ data }))
        return BROKER_DEALERS_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(getBrokerDealerSwaps.rejected({ errorMessage: 'Could not fetch broker dealer swaps' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const approveAccreditation = async (id: number) => {
  const result = await apiService.post(admin.approveAccreditation(id), undefined)
  return result.data
}

export function useApproveAccreditation() {
  const dispatch = useDispatch<AppDispatch>()
  const getAccretitations = useGetAccreditationList()
  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(postApproveAccreditation.pending())
        const data = await approveAccreditation(id)
        dispatch(postApproveAccreditation.fulfilled({ data }))
        await getAccretitations({ page: 1, offset: 10 })
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postApproveAccreditation.rejected({ errorMessage: 'Could not approve accreditation' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const declineAccreditation = async ({ id, ...data }: { id: number; message: string }) => {
  const result = await apiService.post(admin.declineAccreditation(id), data)
  return result.data
}

export function useDeclineAccreditation() {
  const dispatch = useDispatch<AppDispatch>()
  const getAccretitations = useGetAccreditationList()
  const callback = useCallback(
    async (data: { id: number; message: string }) => {
      try {
        dispatch(postDeclineAccreditation.pending())
        const res = await declineAccreditation(data)
        dispatch(postDeclineAccreditation.fulfilled({ data: res }))
        await getAccretitations({ page: 1, offset: 10 })
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postDeclineAccreditation.rejected({ errorMessage: 'Could not decline accreditation' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const accreditationReset = async (tokenId: number) => {
  const result = await apiService.post(admin.accreditationReset(tokenId), undefined)
  return result.data
}

export function useResetAccreditation() {
  const dispatch = useDispatch<AppDispatch>()
  const getAccretitations = useGetAccreditationList()
  const callback = useCallback(
    async (tokenId: number) => {
      try {
        dispatch(postResetAccreditation.pending())
        const data = await accreditationReset(tokenId)
        dispatch(postResetAccreditation.fulfilled({ data }))
        await getAccretitations({ page: 1, offset: 10 })
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postResetAccreditation.rejected({ errorMessage: 'Could not reset accreditation' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const getKyc = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(admin.kycList, undefined, params)
  return result.data
}

export function useGetKycList() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(getKycList.pending())
        const data = await getKyc(params)
        dispatch(getKycList.fulfilled({ data }))
        return KYC_LIST_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(getKycList.rejected({ errorMessage: 'Could not get kyc list' }))
        return KYC_LIST_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const approveKyc = async (id: number) => {
  const result = await apiService.post(admin.approveKyc(id), undefined)
  return result.data
}

export function useApproveKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const getKycList = useGetKycList()
  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(postApproveKyc.pending())
        const data = await approveKyc(id)
        dispatch(postApproveKyc.fulfilled({ data }))
        await getKycList()
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postApproveKyc.rejected({ errorMessage: 'Could not approve kyc' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const rejectKyc = async ({ id, ...data }: { id: number; message?: string }) => {
  const result = await apiService.post(admin.rejectKyc(id), data)
  return result.data
}

export function useRejectKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const getKycList = useGetKycList()
  const callback = useCallback(
    async (data: { id: number; message?: string }) => {
      try {
        dispatch(postRejectKyc.pending())
        const res = await rejectKyc(data)
        dispatch(postRejectKyc.fulfilled({ data: res }))
        await getKycList()
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postRejectKyc.rejected({ errorMessage: 'Could not reject jyc' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const resetKyc = async (data: { id: number; message?: string }) => {
  const result = await apiService.post(admin.resetKyc(data.id), data)
  return result.data
}

export function useResetKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const getKycList = useGetKycList()
  const callback = useCallback(
    async (data: { id: number; message?: string }) => {
      try {
        dispatch(postResetKyc.pending())
        const res = await resetKyc(data)
        dispatch(postResetKyc.fulfilled({ data: res }))
        await getKycList()
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postResetKyc.rejected({ errorMessage: 'Could not reset kyc' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}
