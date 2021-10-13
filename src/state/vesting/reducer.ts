import { createReducer } from '@reduxjs/toolkit'
import { VestingStatus } from 'pages/Farming/Vesting/Vesting'
import {
  getDetails,
  saveAvailableClaim,
  saveIsVesting,
  savePayouts,
  saveCustomVestingAddress,
  saveVestingStatus,
  getIsPrivateBuyer,
  claimAll,
  persistIsVesting,
} from './actions'
import { VestingState } from './types'

const initialState: VestingState = {
  loadingVesting: false,
  vestingError: null,
  isVesting: false,
  details: null,
  payouts: [],
  availableClaim: '',
  customVestingAddress: '',
  vestingStatus: VestingStatus.LOADING,
  loadingDetails: false,
  loadingIsVesting: false,
  loadingPayouts: false,
  loadingAvailableClaim: false,
  loadingClaimAll: false,
  privateBuyer: {} as VestingState['privateBuyer'],
}
export default createReducer<VestingState>(initialState, (builder) =>
  builder
    .addCase(getDetails.pending, (state) => {
      state.loadingDetails = true
      state.vestingError = null
    })
    .addCase(getDetails.fulfilled, (state, { payload: { details } }) => {
      state.loadingDetails = false
      state.vestingError = null
      state.details = details
    })
    .addCase(getDetails.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingDetails = false
      state.vestingError = errorMessage
      state.details = null
      state.payouts = []
      state.availableClaim = ''
      state.isVesting = false
    })
    .addCase(saveIsVesting.pending, (state) => {
      state.loadingIsVesting = true
    })
    .addCase(saveIsVesting.fulfilled, (state, { payload: { isVesting } }) => {
      state.isVesting = isVesting
      state.loadingIsVesting = false
    })
    .addCase(persistIsVesting, (state, { payload: { isVesting } }) => {
      state.isVesting = isVesting
    })
    .addCase(saveIsVesting.rejected, (state) => {
      state.loadingIsVesting = false
      state.isVesting = false
    })
    .addCase(savePayouts.pending, (state) => {
      state.loadingPayouts = true
      state.payouts = []
    })
    .addCase(savePayouts.fulfilled, (state, { payload: { payouts } }) => {
      state.payouts = payouts
      state.loadingPayouts = false
    })
    .addCase(savePayouts.rejected, (state) => {
      state.loadingPayouts = false
      state.payouts = []
    })
    .addCase(saveAvailableClaim.pending, (state) => {
      state.loadingAvailableClaim = true
      state.availableClaim = ''
    })
    .addCase(saveAvailableClaim.fulfilled, (state, { payload: { availableClaim } }) => {
      state.availableClaim = availableClaim
      state.loadingAvailableClaim = false
    })
    .addCase(saveAvailableClaim.rejected, (state) => {
      state.loadingAvailableClaim = false
      state.availableClaim = ''
    })
    .addCase(saveCustomVestingAddress, (state, { payload: { customVestingAddress } }) => {
      state.customVestingAddress = customVestingAddress
    })
    .addCase(saveVestingStatus, (state, { payload }) => {
      state.vestingStatus = payload
    })
    .addCase(getIsPrivateBuyer.pending, (state) => {
      state.loadingVesting = true
      state.privateBuyer = {} as VestingState['privateBuyer']
    })
    .addCase(getIsPrivateBuyer.fulfilled, (state, { payload: { data } }) => {
      state.privateBuyer = data
      state.loadingVesting = false
    })
    .addCase(getIsPrivateBuyer.rejected, (state) => {
      state.loadingVesting = false
      state.privateBuyer = {} as VestingState['privateBuyer']
    })
    .addCase(claimAll.pending, (state) => {
      state.loadingClaimAll = true
    })
    .addCase(claimAll.fulfilled, (state) => {
      state.loadingClaimAll = false
    })
    .addCase(claimAll.rejected, (state) => {
      state.loadingClaimAll = false
    })
)
