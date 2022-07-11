import { createReducer } from '@reduxjs/toolkit'

import { getMyPayoutList, getPayoutHistoryList } from './actions'
import { PayoutList, PayoutHistoryList } from './types'

export interface TokenManagerState {
  payoutList: PayoutList
  payoutHistory: PayoutHistoryList
  error: string | null
  isLoading: boolean
}

export const initialState: TokenManagerState = {
  payoutList: { page: 1, offset: 10, totalItems: 0, totalPages: 0, itemCount: 0, items: [], nextPage: 2, prevPage: 0 },
  payoutHistory: {
    page: 1,
    offset: 10,
    totalItems: 0,
    totalPages: 0,
    itemCount: 0,
    items: [],
    nextPage: 2,
    prevPage: 1,
  },
  error: null,
  isLoading: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getMyPayoutList.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getMyPayoutList.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.payoutList = payload
    })
    .addCase(getMyPayoutList.rejected, (state, { payload: { errorMessage } }) => {
      state.isLoading = false
      state.error = errorMessage
    })
    .addCase(getPayoutHistoryList.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getPayoutHistoryList.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.payoutHistory = payload
    })
    .addCase(getPayoutHistoryList.rejected, (state, { payload: { errorMessage } }) => {
      state.isLoading = false
      state.error = errorMessage
    })
)
