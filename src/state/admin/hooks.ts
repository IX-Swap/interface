import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { adminOffset } from 'state/admin/constants'
import apiService from 'services/apiService'
import { admin } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'

import {
  getBrokerDealerList,
  getBrokerDealerSwaps,
  getAccreditationList,
  logout,
  postApproveAccreditation,
  postDeclineAccreditation,
  postResetAccreditation,
  getKycList,
  postApproveKyc,
  postRejectKyc,
  postResetKyc,
  postResubmitKyc,
  getAdminList,
  getWhitelistedList,
  patchAddOrRemoveWhitelisted,
} from './actions'
import { useUserState } from 'state/user/hooks'
import { useDeleteConfirmationPopupToggle } from 'state/application/hooks'

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

export const adminList = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(admin.adminList, undefined, params)
  return result.data
}

export function useGetAdminList() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(getAdminList.pending())
        const data = await adminList(params)
        dispatch(getAdminList.fulfilled({ data }))
        return data
      } catch (error: any) {
        dispatch(getAdminList.rejected({ errorMessage: 'Could not get me' }))
        return null
      }
    },
    [dispatch]
  )
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
  const {
    accreditationList: { page, offset },
  } = useAdminState()
  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(postApproveAccreditation.pending())
        const data = await approveAccreditation(id)
        dispatch(postApproveAccreditation.fulfilled({ data }))
        await getAccretitations({ page, offset })
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
  const {
    accreditationList: { page, offset },
  } = useAdminState()
  const callback = useCallback(
    async (data: { id: number; message: string }) => {
      try {
        dispatch(postDeclineAccreditation.pending())
        const res = await declineAccreditation(data)
        dispatch(postDeclineAccreditation.fulfilled({ data: res }))
        await getAccretitations({ page, offset })
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
  const {
    accreditationList: { page, offset },
  } = useAdminState()
  const callback = useCallback(
    async (tokenId: number) => {
      try {
        dispatch(postResetAccreditation.pending())
        const data = await accreditationReset(tokenId)
        dispatch(postResetAccreditation.fulfilled({ data }))
        await getAccretitations({ page, offset })
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

export const approveKyc = async (id: number, riskReportId: number) => {
  const result = await apiService.post(admin.approveKyc(id, riskReportId), undefined)
  return result.data
}

export function useApproveKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const getKycList = useGetKycList()
  const {
    kycList: { page, offset },
  } = useAdminState()
  const callback = useCallback(
    async (id: number, riskReportId: number) => {
      try {
        dispatch(postApproveKyc.pending())
        const data = await approveKyc(id, riskReportId)
        dispatch(postApproveKyc.fulfilled({ data }))
        await getKycList({ page, offset })
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

export const rejectKyc = async ({
  id,
  riskReportId,
  ...data
}: {
  id: number
  message?: string
  riskReportId: number
}) => {
  const result = await apiService.post(admin.rejectKyc(id, riskReportId), data)
  return result.data
}

export function useRejectKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const getKycList = useGetKycList()
  const {
    kycList: { page, offset },
  } = useAdminState()
  const callback = useCallback(
    async (data: { id: number; message?: string; riskReportId: number }) => {
      try {
        dispatch(postRejectKyc.pending())
        const res = await rejectKyc(data)
        dispatch(postRejectKyc.fulfilled({ data: res }))
        await getKycList({ page, offset })
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
  const {
    kycList: { page, offset },
  } = useAdminState()
  const callback = useCallback(
    async (data: { id: number; message?: string }) => {
      try {
        dispatch(postResetKyc.pending())
        const res = await resetKyc(data)
        dispatch(postResetKyc.fulfilled({ data: res }))
        await getKycList({ page, offset })
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

export const getKycById = async (id: string | number) => {
  const result = await apiService.get(admin.kycById(id))
  return result.data
}

export const resubmitKyc = async (id: number) => {
  const result = await apiService.post(admin.resubmitKyc(id), {})
  return result.data
}

export function useResubmitKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const getKycList = useGetKycList()
  const {
    kycList: { page, offset },
  } = useAdminState()
  const callback = useCallback(
    async (id: number) => {
      try {
        dispatch(postResubmitKyc.pending())
        await resubmitKyc(id)
        dispatch(postResubmitKyc.fulfilled())
        await getKycList({ page, offset })
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postResubmitKyc.rejected({ errorMessage: 'Could not reset kyc' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export const getAtlasIdByTicker = async (ticker: string) => {
  const result = await apiService.get(admin.getAtlasIdByTicker(ticker))
  return result.data
}
export const addAdmin = async (address: string) => {
  const result = await apiService.post(admin.addAdmin(), { address })
  return result.data
}

export const useOnlyAdminAccess = () => {
  const { me } = useUserState()
  const history = useHistory()

  if (me?.role !== 'admin') {
    history.push('/admin/kyc')
  }
}

const getWhitelistedListReq = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(admin.whitelistedList, undefined, params)
  return result.data
}

export const useGetWhitelistedList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(getWhitelistedList.pending())
        const data = await getWhitelistedListReq(params)
        dispatch(getWhitelistedList.fulfilled({ data }))
        return data
      } catch (error: any) {
        dispatch(getWhitelistedList.rejected({ errorMessage: 'Could not get whitelisted users' }))
        return null
      }
    },
    [dispatch]
  )
  return callback
}

interface AddOrRemoveWhitelisted {
  address: string
  isWhitelisted: boolean
}

export const patchAddOrRemoveWhitelistedReq = async ({ address, isWhitelisted }: AddOrRemoveWhitelisted) => {
  const result = await apiService.patch(admin.addOrRemoveWhitelisted(address), { isWhitelisted })
  return result.data
}

export const useAddOrRemoveWhitelisted = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getWhitelisted = useGetWhitelistedList()
  const toggle = useDeleteConfirmationPopupToggle()

  const callback = useCallback(
    async (data: AddOrRemoveWhitelisted) => {
      try {
        dispatch(patchAddOrRemoveWhitelisted.pending())

        const res = await patchAddOrRemoveWhitelistedReq(data)
        if (!res.isWhitelisted) {
          toggle()
        }
        await getWhitelisted({ page: 1, offset: adminOffset })

        dispatch(patchAddOrRemoveWhitelisted.fulfilled())

        return res
      } catch (error: any) {
        dispatch(patchAddOrRemoveWhitelisted.rejected({ errorMessage: 'Could not get whitelisted users' }))
        return null
      }
    },
    [dispatch, toggle, getWhitelisted]
  )
  return callback
}
