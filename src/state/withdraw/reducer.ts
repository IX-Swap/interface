import { createReducer } from '@reduxjs/toolkit'
import {
  setCurrency,
  setNetwork,
  setTransaction,
  typeAmount,
  typeReceiver,
  withdrawCurrency,
  resetWithdraw,
  getFeeStatus,
  getFeePrice,
  postPaidFee,
} from './actions'

export interface WithdrawState {
  readonly amount: string
  readonly receiver: string
  readonly currencyId?: string
  readonly networkName?: string
  loadingWithdraw: boolean
  loading: boolean
  withdrawError: string | null
  tx: string | null
  feeStatus: string
  feePrice: number | null
}

const initialState: WithdrawState = {
  amount: '',
  receiver: '',
  currencyId: '',
  loadingWithdraw: false,
  withdrawError: null,
  tx: null,
  networkName: '',
  feeStatus: '',
  feePrice: null,
  loading: false,
}

export default createReducer<WithdrawState>(initialState, (builder) =>
  builder
    .addCase(typeAmount, (state, { payload: { typedValue } }) => {
      return {
        ...state,
        amount: typedValue,
      }
    })
    .addCase(typeReceiver, (state, { payload: { typedValue } }) => {
      return {
        ...state,
        receiver: typedValue,
      }
    })
    .addCase(setCurrency, (state, { payload: { currencyId } }) => {
      return {
        ...state,
        currencyId,
      }
    })
    .addCase(setNetwork, (state, { payload: { networkName } }) => {
      state.networkName = networkName
    })
    .addCase(withdrawCurrency.pending, (state) => {
      state.loadingWithdraw = true
      state.withdrawError = null
      state.tx = null
    })
    .addCase(withdrawCurrency.fulfilled, (state) => {
      state.loadingWithdraw = false
      state.withdrawError = null
    })
    .addCase(withdrawCurrency.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingWithdraw = false
      state.withdrawError = errorMessage
    })
    .addCase(setTransaction, (state, { payload: { tx } }) => {
      state.tx = tx
    })
    .addCase(resetWithdraw, (state, {}) => {
      state.amount = initialState.amount
      state.currencyId = initialState.currencyId
      state.receiver = initialState.receiver
    })
    .addCase(getFeeStatus.pending, (state) => {
      state.loading = true
      state.withdrawError = null
      state.tx = null
    })
    .addCase(getFeeStatus.fulfilled, (state, { payload }) => {
      state.loading = false
      state.withdrawError = null
      state.feeStatus = payload
    })
    .addCase(getFeeStatus.rejected, (state, { payload: { errorMessage } }) => {
      state.loading = false
      state.withdrawError = errorMessage
    })
    .addCase(getFeePrice.pending, (state) => {
      state.loading = true
      state.withdrawError = null
      state.tx = null
    })
    .addCase(getFeePrice.fulfilled, (state, { payload }) => {
      state.loading = false
      state.withdrawError = null
      state.feePrice = +payload
    })
    .addCase(getFeePrice.rejected, (state, { payload: { errorMessage } }) => {
      state.loading = false
      state.withdrawError = errorMessage
    })
    .addCase(postPaidFee.pending, (state) => {
      state.loading = true
      state.withdrawError = null
      state.tx = null
    })
    .addCase(postPaidFee.fulfilled, (state) => {
      state.loading = false
      state.withdrawError = null
    })
    .addCase(postPaidFee.rejected, (state, { payload: { errorMessage } }) => {
      state.loading = false
      state.withdrawError = errorMessage
    })
)
