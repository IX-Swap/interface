import { createReducer } from '@reduxjs/toolkit'
import { saveToken } from './actions'

export interface AuthState {
  readonly token?: string
  readonly expiresAt?: number
}

const initialState: AuthState = {
  token: undefined,
  expiresAt: undefined,
}

export default createReducer<AuthState>(initialState, (builder) =>
  builder.addCase(saveToken, (state, { payload: { value } }) => {
    return {
      ...state,
      token: value.token,
      expiresAt: value.expiresAt,
    }
  })
)
