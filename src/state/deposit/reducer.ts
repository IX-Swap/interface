import { createReducer } from '@reduxjs/toolkit'
import {
  depositSecTokens,
  setCurrency,
  setError,
  setLoading,
  setModalView,
  setNetworkName,
  typeAmount,
  typeSender,
  resetDeposit,
} from './actions'
export enum DepositModalView {
  CREATE_REQUEST,
  SEND_INFO,
  PENDING,
  ERROR,
  ABOUT_WRAPPING,
}
export interface DepositState {
  readonly amount: string
  readonly sender: string
  readonly currencyId?: string
  readonly networkName?: string
  readonly loadingDeposit: boolean
  readonly depositError: string | null
  readonly modalView: DepositModalView
}

const initialState: DepositState = {
  amount: '',
  sender: '',
  currencyId: '',
  loadingDeposit: false,
  depositError: null,
  networkName: undefined,
  modalView: DepositModalView.CREATE_REQUEST,
}

export default createReducer<DepositState>(initialState, (builder) =>
  builder
    .addCase(typeAmount, (state, { payload: { typedValue } }) => {
      return {
        ...state,
        amount: typedValue,
      }
    })
    .addCase(typeSender, (state, { payload: { typedValue } }) => {
      return {
        ...state,
        sender: typedValue,
      }
    })
    .addCase(setCurrency, (state, { payload: { currencyId } }) => {
      return {
        ...state,
        currencyId,
      }
    })
    .addCase(depositSecTokens.pending, (state) => {
      state.loadingDeposit = true
      state.depositError = null
    })
    .addCase(depositSecTokens.fulfilled, (state) => {
      state.loadingDeposit = false
      state.depositError = null
    })
    .addCase(depositSecTokens.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingDeposit = false
      state.depositError = errorMessage
    })
    .addCase(setError, (state, { payload: { errorMessage } }) => {
      state.depositError = errorMessage
    })
    .addCase(setLoading, (state, { payload: { loading } }) => {
      state.loadingDeposit = loading
    })
    .addCase(setModalView, (state, { payload: { view } }) => {
      state.modalView = view
    })
    .addCase(setNetworkName, (state, { payload: { networkName } }) => {
      state.networkName = networkName
    })
    .addCase(resetDeposit, (state, {}) => {
      state.amount = initialState.amount
      state.currencyId = initialState.currencyId
      state.sender = initialState.sender
    })
)
