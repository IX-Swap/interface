import { createReducer } from '@reduxjs/toolkit'
import { setCurrency, setTransaction, typeAmount, typeReceiver, withdrawCurrency } from './actions'

export interface WithdrawState {
  readonly amount: string
  readonly receiver: string
  readonly currencyId?: string
  loadingWithdraw: boolean
  withdrawError: string | null
  tx: string | null
}

const initialState: WithdrawState = {
  amount: '',
  receiver: '',
  currencyId: '',
  loadingWithdraw: false,
  withdrawError: null,
  tx: null,
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
)
