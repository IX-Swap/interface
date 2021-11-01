import { createReducer } from '@reduxjs/toolkit'
import { getTokenExpiration } from 'utils/time'
import {
  postLogin,
  getMe,
  logout,
  RawGetMePayload,
  KycList,
  getBrokerDealerList,
  getBrokerDealerSwaps,
  BrokerDealerList,
  getKycList,
  postApproveKyc,
  postDeclineKyc,
  postKycReset,
  BrokerDealerSwaps,
} from './actions'

export interface AdminState {
  readonly token?: string
  readonly expiresAt?: number
  adminLoading: boolean
  adminIsAuthenticated: boolean
  adminError: string | null
  adminData: RawGetMePayload
  kycList: KycList
  brokerDealerList: BrokerDealerList
  brokerDealerSwaps: BrokerDealerSwaps
}

const initialState: AdminState = {
  token: localStorage.getItem('adminAccessToken') || '',
  expiresAt: undefined,
  adminLoading: false,
  adminError: null,
  adminData: {} as RawGetMePayload,
  adminIsAuthenticated: Boolean(localStorage.getItem('adminAccessToken')),
  kycList: {
    page: 0,
    offset: 0,
    totalItems: 0,
    totalPages: 0,
    itemCount: 0,
    items: [],
    nextPage: 0,
    prevPage: 0,
  },
  brokerDealerList: {
    data: null,
  },
  brokerDealerSwaps: {
    items: [],
    totalPages: 0,
    page: 1,
    offset: 50,
  },
}

export default createReducer<AdminState>(initialState, (builder) =>
  builder
    .addCase(postLogin.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postLogin.fulfilled, (state, { payload: { auth } }) => {
      localStorage.setItem('adminAccessToken', auth.accessToken)
      state.adminLoading = false
      state.adminError = null
      const expirationTime = getTokenExpiration(auth.expiresIn)
      state.token = auth.accessToken
      state.expiresAt = expirationTime
    })
    .addCase(postLogin.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(getMe.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(getMe.fulfilled, (state, { payload: { data } }) => {
      state.adminIsAuthenticated = true
      state.adminLoading = false
      state.adminError = null
      state.adminData = data
    })
    .addCase(getMe.rejected, (state, { payload: { errorMessage } }) => {
      localStorage.removeItem('adminAccessToken')
      state.adminIsAuthenticated = false
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('adminAccessToken')
      state.adminIsAuthenticated = false
      state.adminLoading = false
      state.adminError = null
      state.adminData = {} as RawGetMePayload
    })
    .addCase(getKycList.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(getKycList.fulfilled, (state, { payload: { data } }) => {
      state.adminLoading = false
      state.adminError = null
      state.kycList = data
    })
    .addCase(getKycList.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postApproveKyc.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postApproveKyc.fulfilled, (state, { payload: { data } }) => {
      const list = [...state.kycList.items]
      state.adminLoading = false
      state.adminError = null
      state.kycList = {
        ...state.kycList,
        items: list.map((el) => ({ ...el, status: el.id === data.id ? data.status : el.status })),
      }
    })
    .addCase(postApproveKyc.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postDeclineKyc.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postDeclineKyc.fulfilled, (state, { payload: { data } }) => {
      const list = [...state.kycList.items]
      state.adminLoading = false
      state.adminError = null
      state.kycList = {
        ...state.kycList,
        items: list.map((el) => ({ ...el, status: el.id === data.id ? data.status : el.status })),
      }
    })
    .addCase(postDeclineKyc.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postKycReset.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postKycReset.fulfilled, (state, { payload: { data } }) => {
      const list = [...state.kycList.items]
      state.adminLoading = false
      state.adminError = null
      state.kycList = {
        ...state.kycList,
        items: list.filter((el) => el.id !== data.id),
      }
    })
    .addCase(postKycReset.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(getBrokerDealerList.fulfilled, (state, { payload: { data } }) => {
      state.adminLoading = false
      state.adminError = null
      state.brokerDealerList = data
    })
    .addCase(getBrokerDealerList.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(getBrokerDealerList.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(getBrokerDealerSwaps.fulfilled, (state, { payload: { data } }) => {
      state.adminLoading = false
      state.adminError = null
      state.brokerDealerSwaps = data
    })
    .addCase(getBrokerDealerSwaps.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
)
