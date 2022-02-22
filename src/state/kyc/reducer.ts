import { createReducer } from '@reduxjs/toolkit'

import { fetchCreateIndividualKYC, fetchGetMyKyc } from './actions'

export interface KYCState {
  loadingRequest: boolean
  error: any | null
  kyc: any | null
}

const initialState: KYCState = {
  loadingRequest: false,
  error: null,
  kyc: null,
}

export default createReducer<KYCState>(initialState, (builder) =>
  builder
    .addCase(fetchCreateIndividualKYC.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(fetchCreateIndividualKYC.fulfilled, (state, { payload: { data } }) => {
      state.loadingRequest = false
      state.error = null
    })
    .addCase(fetchCreateIndividualKYC.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
    .addCase(fetchGetMyKyc.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(fetchGetMyKyc.fulfilled, (state, { payload }) => {
      state.loadingRequest = false
      state.error = null
      state.kyc = payload
    })
    .addCase(fetchGetMyKyc.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
)
