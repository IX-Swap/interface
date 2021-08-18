import { createReducer } from '@reduxjs/toolkit'
import { getDetails, saveAvailableClaim, saveIsVesting, savePayouts } from './actions'
import { VestingState } from './types'

const initialState: VestingState = {
  loadingVesting: false,
  vestingError: null,
  isVesting: false,
  details: null,
  payouts: [],
  availableClaim: '',
}
export default createReducer<VestingState>(initialState, (builder) =>
  builder
    .addCase(getDetails.pending, (state) => {
      state.loadingVesting = true
      state.vestingError = null
    })
    .addCase(getDetails.fulfilled, (state, { payload: { details } }) => {
      state.loadingVesting = false
      state.vestingError = null
      state.details = details
    })
    .addCase(getDetails.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingVesting = false
      state.vestingError = errorMessage
    })
    .addCase(saveIsVesting, (state, { payload: { isVesting } }) => {
      state.isVesting = isVesting
      state.loadingVesting = false
    })
    .addCase(savePayouts, (state, { payload: { payouts } }) => {
      state.payouts = payouts
      state.loadingVesting = false
    })
    .addCase(saveAvailableClaim, (state, { payload: { availableClaim } }) => {
      state.availableClaim = availableClaim
      state.loadingVesting = false
    })
)
