import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import apiService from 'services/apiService'
import { admin } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import {
  getBrokerDealerList,
  getBrokerDealerSwaps,
  getKycList,
  getMe,
  logout,
  postApproveKyc,
  postDeclineKyc,
  postKycReset,
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

export const getKyc = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(admin.kycList, undefined, params)
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

export function useBrokerDealerList() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(getBrokerDealerList.pending())
        const data = await getBrokerDealers(params)
        dispatch(getBrokerDealerList.fulfilled({ data }))
        return KYC_LIST_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(getBrokerDealerList.rejected({ errorMessage: 'Could not get broker dealer list' }))
        return KYC_LIST_STATUS.FAILED
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

export const approveKyc = async (id: number) => {
  const result = await apiService.post(admin.approveKyc(id), undefined)
  return result.data
}

export function useApproveKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(postApproveKyc.pending())
        const data = await approveKyc(id)
        dispatch(postApproveKyc.fulfilled({ data }))
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

export const declineKyc = async ({ id, ...data }: { id: number; message: string }) => {
  const result = await apiService.post(admin.declineKyc(id), data)
  return result.data
}

export function useDeclineKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (data: { id: number; message: string }) => {
      try {
        dispatch(postDeclineKyc.pending())
        const res = await declineKyc(data)
        dispatch(postDeclineKyc.fulfilled({ data: res }))
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postDeclineKyc.rejected({ errorMessage: 'Could not decline kyc' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const kycReset = async (tokenId: number) => {
  const result = await apiService.post(admin.kycReset(tokenId), undefined)
  return result.data
}

export function useKycReset() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (tokenId: number) => {
      try {
        dispatch(postKycReset.pending())
        const data = await kycReset(tokenId)
        dispatch(postKycReset.fulfilled({ data }))
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postKycReset.rejected({ errorMessage: 'Could not get accreditation for kyc' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}
