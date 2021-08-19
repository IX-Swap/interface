import { createReducer } from '@reduxjs/toolkit'
import { getTokenExpiration } from 'utils/time'
import { postLogin, getMe, RawGetMePayload, logout } from './actions'

export interface AdminState {
  readonly token?: string
  readonly expiresAt?: number
  adminLoading: boolean
  adminIsAuthenticated: boolean
  adminError: string | null
  adminData: RawGetMePayload
}

const initialState: AdminState = {
  token: localStorage.getItem('accessToken') || '',
  expiresAt: undefined,
  adminLoading: false,
  adminError: null,
  adminData: {} as RawGetMePayload,
  adminIsAuthenticated: Boolean(localStorage.getItem('accessToken')),
}

export default createReducer<AdminState>(initialState, (builder) =>
  builder
    .addCase(postLogin.pending, (state) => {
      state.adminLoading = true
      state.adminError = null
    })
    .addCase(postLogin.fulfilled, (state, { payload: { auth } }) => {
      localStorage.setItem('accessToken', auth.accessToken)
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
      localStorage.removeItem('accessToken')
      state.adminIsAuthenticated = false
      state.adminLoading = false
      state.adminError = errorMessage
    })
    .addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('accessToken')
      state.adminIsAuthenticated = false
      state.adminLoading = false
      state.adminError = null
      state.adminData = {} as RawGetMePayload
    })
)
