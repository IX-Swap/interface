import { createReducer } from '@reduxjs/toolkit'

import { setPoolTransctionHash, addLiquidity } from './actions'

export interface PoolState {
  readonly transactionHash: null | string
  isLoading: boolean
  errorMessage: string
}

const initialState: PoolState = {
  transactionHash: null,
  isLoading: false,
  errorMessage: '',
}

export default createReducer<PoolState>(initialState, (builder) =>
  builder
    .addCase(setPoolTransctionHash, (state, { payload: { transactionHash } }) => {
      return {
        ...state,
        transactionHash,
      }
    })
    .addCase(addLiquidity.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      }
    })
    .addCase(addLiquidity.fulfilled, (state) => {
      return {
        ...state,
        isLoading: false,
      }
    })
    .addCase(addLiquidity.rejected, (state, { payload: { errorMessage } }) => {
      return {
        ...state,
        errorMessage,
      }
    })
)
