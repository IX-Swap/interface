import { createReducer } from '@reduxjs/toolkit'

import { postLogin } from 'state/auth/actions'

import { createDraft } from './actions'

export interface KYCState {
  loadingRequest: boolean
  error: any | null
}

const initialState: KYCState = {
  loadingRequest: false,
  error: null,
}

export default createReducer<KYCState>(initialState, (builder) =>
  builder
    .addCase(createDraft.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(createDraft.fulfilled, (state) => {
      state.loadingRequest = false
      state.error = null
    })
    .addCase(createDraft.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
    .addCase(postLogin.pending, (state) => {
      state.loadingRequest = true
    })
    .addCase(postLogin.rejected, (state) => {
      state.loadingRequest = false
    })
)
