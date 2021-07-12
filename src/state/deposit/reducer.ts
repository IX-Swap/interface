import { createReducer } from '@reduxjs/toolkit'
import { setCurrency, typeAmount, typeSender } from './actions'

export interface DepositState {
  readonly amount: string
  readonly sender: string
  readonly currencyId?: string
}

const initialState: DepositState = {
  amount: '',
  sender: '',
  currencyId: '',
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
)
