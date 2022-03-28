import { createReducer } from '@reduxjs/toolkit'
import { getTokenExpiration } from 'utils/time'
import {
  postLogin,
  getMe,
  logout,
  RawGetMePayload,
  AccreditationList,
  getBrokerDealerList,
  getBrokerDealerSwaps,
  BrokerDealerList,
  KycList,
  getAccreditationList,
  postApproveAccreditation,
  postDeclineAccreditation,
  postResetAccreditation,
  postApproveKyc,
  postRejectKyc,
  postResetKyc,
  BrokerDealerSwaps,
  getKycList,
  postResubmitKyc,
} from './actions'

export interface AdminState {
  readonly token?: string
  readonly expiresAt?: number
  adminLoading: boolean
  adminIsAuthenticated: boolean
  adminError: string | null
  adminData: RawGetMePayload | null
  accreditationList: AccreditationList
  kycList: KycList
  brokerDealerList: BrokerDealerList
  brokerDealerSwaps: BrokerDealerSwaps
}

const initialState: AdminState = {
  token: localStorage.getItem('adminAccessToken') || '',
  expiresAt: undefined,
  adminLoading: false,
  adminError: null,
  adminData: null,
  adminIsAuthenticated: Boolean(localStorage.getItem('adminAccessToken')),
  accreditationList: {
    page: 0,
    offset: 0,
    totalItems: 0,
    totalPages: 0,
    itemCount: 0,
    items: [],
    nextPage: 0,
    prevPage: 0,
  },
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
      state.adminIsAuthenticated = false
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(logout.fulfilled, (state) => {
      state.adminIsAuthenticated = false
      state.adminLoading = false
      state.adminError = null
      state.adminData = null
    })
    .addCase(getAccreditationList.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(getAccreditationList.fulfilled, (state, { payload: { data } }) => {
      state.adminLoading = false
      state.adminError = null
      state.accreditationList = data
    })
    .addCase(getAccreditationList.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postApproveAccreditation.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postApproveAccreditation.fulfilled, (state, { payload: { data } }) => {
      state.adminLoading = false
      state.adminError = null
    })
    .addCase(postApproveAccreditation.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postDeclineAccreditation.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postDeclineAccreditation.fulfilled, (state, { payload: { data } }) => {
      state.adminLoading = false
      state.adminError = null
    })
    .addCase(postDeclineAccreditation.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postResetAccreditation.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postResetAccreditation.fulfilled, (state, { payload: { data } }) => {
      state.adminLoading = false
      state.adminError = null
    })
    .addCase(postResetAccreditation.rejected, (state, { payload: { errorMessage } }) => {
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
    .addCase(postApproveKyc.fulfilled, (state) => {
      state.adminLoading = false
      state.adminError = null
    })
    .addCase(postApproveKyc.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postRejectKyc.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postRejectKyc.fulfilled, (state) => {
      state.adminLoading = false
      state.adminError = null
    })
    .addCase(postRejectKyc.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postResetKyc.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postResetKyc.fulfilled, (state) => {
      state.adminLoading = false
      state.adminError = null
    })
    .addCase(postResetKyc.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(postResubmitKyc.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postResubmitKyc.fulfilled, (state) => {
      state.adminLoading = false
      state.adminError = null
    })
    .addCase(postResubmitKyc.rejected, (state, { payload: { errorMessage } }) => {
      state.adminLoading = false
      state.adminError = errorMessage
    })
)
