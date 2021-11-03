import { createReducer } from '@reduxjs/toolkit'
import { setPoolTransctionHash } from './actions'

export interface PoolState {
  readonly transactionHash: null | string
}

const initialState: PoolState = {
  transactionHash: null,
}

export default createReducer<PoolState>(initialState, (builder) =>
  builder.addCase(setPoolTransctionHash, (state, { payload: { transactionHash } }) => {
    return {
      ...state,
      transactionHash,
    }
  })
)
