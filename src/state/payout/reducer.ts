import { createReducer } from '@reduxjs/toolkit'

import { postLogin } from 'state/auth/actions'
import { PayoutList } from 'state/token-manager/types'

import { createDraft, getPayoutList } from './actions'

export interface KYCState {
  loadingRequest: boolean
  error: any | null
  list: PayoutList
}

const initialState: KYCState = {
  loadingRequest: false,
  error: null,
  list: { page: 1, offset: 10, totalItems: 0, totalPages: 0, itemCount: 0, items: [], nextPage: 2, prevPage: 0 },
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
    .addCase(getPayoutList.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(getPayoutList.fulfilled, (state, { payload: { data } }) => {
      state.loadingRequest = false
      state.error = null
      state.list = data
    })
    .addCase(getPayoutList.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
)
