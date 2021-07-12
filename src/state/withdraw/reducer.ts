import { createReducer } from '@reduxjs/toolkit'
import { setCurrency, typeAmount, typeReceiver } from './actions'

export interface WithdrawState {
  readonly amount: string
  readonly receiver: string
  readonly currencyId?: string
}

const initialState: WithdrawState = {
  amount: '',
  receiver: '',
  currencyId: '',
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
)
