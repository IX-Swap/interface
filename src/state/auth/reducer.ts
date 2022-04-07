import { createReducer } from '@reduxjs/toolkit'
import { logout, postLogin } from './actions'

export interface AuthState {
  readonly token: Record<any, string | undefined>
  readonly refreshToken: Record<any, string | undefined>
  loginLoading: boolean
  loginError: string | null
}

const initialState: AuthState = {
  token: {},
  refreshToken: {},
  loginLoading: false,
  loginError: null,
}

export default createReducer<AuthState>(initialState, (builder) =>
  builder
    .addCase(logout, (state, { payload: account }) => {
      state.token[account] = ''
      state.refreshToken[account] = ''
    })
    .addCase(postLogin.pending, (state, { payload: account }) => {
      state.loginLoading = true
      state.loginError = null
      if (!state.token) {
        state.token = { [account]: '' }
      }
      if (!state.refreshToken) {
        state.refreshToken = { [account]: '' }
      }
    })
    .addCase(postLogin.fulfilled, (state, { payload: { auth, account } }) => {
      state.loginLoading = false
      state.loginError = null
      state.token[account] = auth.accessToken
      state.refreshToken[account] = auth.refreshToken
      localStorage.setItem('redux_localstorage_simple_auth', JSON.stringify(state))
    })
    .addCase(postLogin.rejected, (state, { payload: { errorMessage, account } }) => {
      state.loginLoading = false
      state.loginError = errorMessage
      state.token[account] = ''
      state.refreshToken[account] = ''
    })
)
