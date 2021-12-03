import { createReducer } from '@reduxjs/toolkit'
import { clearToken, logout, postLogin, saveToken } from './actions'

export interface AuthState {
  readonly token?: string
  readonly refreshToken?: string
  loginLoading: boolean
  loginError: string | null
}

const initialState: AuthState = {
  token: undefined,
  refreshToken: undefined,
  loginLoading: false,
  loginError: null,
}

export default createReducer<AuthState>(initialState, (builder) =>
  builder
    .addCase(saveToken, (state, { payload: { value } }) => {
      return {
        ...state,
        token: value.token,
      }
    })
    .addCase(logout, (state) => {
      state.token = ''
      state.refreshToken = ''
    })
    .addCase(clearToken, (state) => {
      state.token = ''
    })
    .addCase(postLogin.pending, (state) => {
      state.loginLoading = true
      state.loginError = null
      state.token = ''
      state.refreshToken = ''
    })
    .addCase(postLogin.fulfilled, (state, { payload: { auth } }) => {
      state.loginLoading = false
      state.loginError = null
      state.token = auth.accessToken
      state.refreshToken = auth.refreshToken
    })
    .addCase(postLogin.rejected, (state, { payload: { errorMessage } }) => {
      state.loginLoading = false
      state.loginError = errorMessage
      state.token = ''
      state.refreshToken = ''
    })
)
