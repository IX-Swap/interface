import { createReducer } from '@reduxjs/toolkit'
import { getTokenExpiration } from 'utils/time'
import { postLogin, saveToken } from './actions'

export interface AuthState {
  readonly token?: string
  readonly expiresAt?: number
  loginLoading: boolean
  loginError: string | null
}

const initialState: AuthState = {
  token: undefined,
  expiresAt: undefined,
  loginLoading: false,
  loginError: null,
}

export default createReducer<AuthState>(initialState, (builder) =>
  builder
    .addCase(saveToken, (state, { payload: { value } }) => {
      return {
        ...state,
        token: value.token,
        expiresAt: value.expiresAt,
      }
    })
    .addCase(postLogin.pending, (state) => {
      state.loginLoading = true
      state.loginError = null
    })
    .addCase(postLogin.fulfilled, (state, { payload: { auth } }) => {
      state.loginLoading = false
      state.loginError = null
      const expirationTime = getTokenExpiration(auth.expiresIn)
      state.token = auth.accessToken
      state.expiresAt = expirationTime
    })
    .addCase(postLogin.rejected, (state, { payload: { errorMessage } }) => {
      state.loginLoading = false
      state.loginError = errorMessage
    })
)
