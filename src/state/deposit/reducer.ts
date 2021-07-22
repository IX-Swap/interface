import { createReducer } from '@reduxjs/toolkit'
import { depositSecTokens, setCurrency, typeAmount, typeSender } from './actions'

export interface DepositState {
  readonly amount: string
  readonly sender: string
  readonly currencyId?: string
  readonly loadingDeposit: boolean
  readonly depositError: string | null
}

const initialState: DepositState = {
  amount: '',
  sender: '',
  currencyId: '',
  loadingDeposit: false,
  depositError: null,
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
)
