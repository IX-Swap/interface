import { createReducer } from '@reduxjs/toolkit'

import { fetchCreateIndividualKYC } from './actions'

export interface KYCState {
  loadingRequest: boolean
  error: null | any
}

const initialState: KYCState = {
  loadingRequest: false,
  error: null,
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
)
