import { createReducer } from '@reduxjs/toolkit'
import { increaseIXSGovAllowance, checkIXSGovAllowance, unstake } from './actions'

interface UnstakingState {
  isApprovingIXSGov: boolean
  approveIXSGovError: boolean
  IXSGovAllowanceAmount: string | null
  isUnstaking: boolean
  isUnstakingFailed: boolean
  hasUnstakedSuccessfully: boolean
}

const initialState: UnstakingState = {
  isApprovingIXSGov: false,
  approveIXSGovError: false,
  IXSGovAllowanceAmount: localStorage.getItem('IXSGovAllowanceAmount'),
  isUnstaking: false,
  isUnstakingFailed: false,
  hasUnstakedSuccessfully: false,
}

export default createReducer<UnstakingState>(initialState, (builder) =>
  builder
    .addCase(increaseIXSGovAllowance.pending, (state) => {
      state.isApprovingIXSGov = true
      state.approveIXSGovError = false
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .addCase(increaseIXSGovAllowance.fulfilled, (state, { payload: { data } }) => {
      state.isApprovingIXSGov = false
      state.approveIXSGovError = false
    })
    .addCase(increaseIXSGovAllowance.rejected, (state, { payload: { errorMessage } }) => {
      state.isApprovingIXSGov = false
      state.approveIXSGovError = true
      console.error('IXSGov approve error: ', errorMessage)
    })
    .addCase(checkIXSGovAllowance, (state, { payload: { allowanceAmount } }) => {
      state.IXSGovAllowanceAmount = allowanceAmount.toString()
      localStorage.setItem('IXSGovAllowanceAmount', allowanceAmount.toString())
    })
    .addCase(unstake.pending, (state) => {
      state.hasUnstakedSuccessfully = false
      state.isUnstaking = true
      state.isUnstakingFailed = false
    })
    .addCase(unstake.fulfilled, (state, { payload: { txStatus } }) => {
      state.isUnstaking = false
      if (txStatus === 1) {
        state.hasUnstakedSuccessfully = true
        state.isUnstakingFailed = false
      } else {
        state.hasUnstakedSuccessfully = false
        state.isUnstakingFailed = true
      }
    })
    .addCase(unstake.rejected, (state, { payload: { errorMessage } }) => {
      state.isUnstaking = false
      state.isUnstakingFailed = true
      state.hasUnstakedSuccessfully = false
      console.error('IXS unstaking error: ', errorMessage)
    })
)
