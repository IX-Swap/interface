import { createReducer } from '@reduxjs/toolkit'
import {
  setCurrency,
  setNetwork,
  setTransaction,
  typeAmount,
  typeReceiver,
  withdrawCurrency,
  resetWithdraw,
  getWithdrawStatus,
  getFeePrice,
  postPaidFee,
  postCreateDraftWithdraw,
  payFee,
} from './actions'

export interface WithdrawStatus {
  tokenId: number
  status: string
  feePrice: number
  userId: number
  type: string
  fromAddress: string
  amount: string
  requestId: string
  depositAddress: string
  custodianAccountId: string
  custodianType: string
  ethTransactionId: number
  blockNumber: number
  feeTxHash: string
  feeAmount: string
  feeContractAddress: string
  feeAccepted: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  id: number
}

export interface WithdrawState {
  readonly amount: string
  readonly receiver: string
  readonly currencyId?: string
  readonly networkName?: string
  loadingWithdraw: boolean
  loading: boolean
  withdrawError: string | null
  tx: string | null
  withdrawStatus: WithdrawStatus
  feePrice: number | null
  loadingFee: boolean
}

const initialState: WithdrawState = {
  amount: '',
  receiver: '',
  currencyId: '',
  loadingWithdraw: false,
  withdrawError: null,
  tx: null,
  networkName: '',
  withdrawStatus: {} as WithdrawStatus,
  feePrice: null,
  loading: false,
  loadingFee: false,
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
    .addCase(getWithdrawStatus.pending, (state) => {
      state.loading = true
      state.withdrawError = null
      state.tx = null
    })
    .addCase(getWithdrawStatus.fulfilled, (state, { payload }) => {
      state.loading = false
      state.withdrawError = null
      state.withdrawStatus = payload
    })
    .addCase(getWithdrawStatus.rejected, (state, { payload: { errorMessage } }) => {
      state.loading = false
      state.withdrawError = errorMessage
      state.withdrawStatus = {} as WithdrawStatus
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
    .addCase(postPaidFee.fulfilled, (state, { payload }) => {
      state.loading = false
      state.withdrawError = null
      state.withdrawStatus = payload
    })
    .addCase(postPaidFee.rejected, (state, { payload: { errorMessage } }) => {
      state.loading = false
      state.withdrawError = errorMessage
    })
    .addCase(postCreateDraftWithdraw.pending, (state) => {
      state.loading = true
      state.withdrawError = null
      state.tx = null
    })
    .addCase(postCreateDraftWithdraw.fulfilled, (state, { payload }) => {
      state.loading = false
      state.withdrawError = null
      state.withdrawStatus = payload
    })
    .addCase(postCreateDraftWithdraw.rejected, (state, { payload: { errorMessage } }) => {
      state.loading = false
      state.withdrawError = errorMessage
    })
    .addCase(payFee.pending, (state) => {
      state.loadingFee = true
      state.withdrawError = null
      state.tx = null
    })
    .addCase(payFee.fulfilled, (state) => {
      state.loadingFee = false
      state.withdrawError = null
    })
    .addCase(payFee.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingFee = false
      state.withdrawError = errorMessage
    })
)
