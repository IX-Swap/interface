import { createReducer } from '@reduxjs/toolkit'

import { postLogin } from 'state/auth/actions'
import { PayoutList } from 'state/token-manager/types'

import { createDraft, getPayoutList, getMyPayoutList } from './actions'

export interface PayoutState {
  loadingRequest: boolean
  error: any | null
  list: PayoutList
  accredited: PayoutList
  owningTokens: PayoutList
  claimed: PayoutList
}

export const payoutTypeFilterLegend = {
  'passed-accreditation': 'accredited',
  'owning-tokens': 'owningTokens',
  'already-claimed': 'claimed',
} as Record<string, string>

const initialState: PayoutState = {
  loadingRequest: false,
  error: null,
  list: { page: 1, offset: 10, totalItems: 0, totalPages: 0, itemCount: 0, items: [], nextPage: 2, prevPage: 0 },
  accredited: { page: 1, offset: 10, totalItems: 0, totalPages: 0, itemCount: 0, items: [], nextPage: 2, prevPage: 0 },
  owningTokens: {
    page: 1,
    offset: 10,
    totalItems: 0,
    totalPages: 0,
    itemCount: 0,
    items: [],
    nextPage: 2,
    prevPage: 0,
  },
  claimed: { page: 1, offset: 10, totalItems: 0, totalPages: 0, itemCount: 0, items: [], nextPage: 2, prevPage: 0 },
}

export default createReducer<PayoutState>(initialState, (builder) =>
  builder
    .addCase(createDraft.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(createDraft.fulfilled, (state) => {
      state.loadingRequest = false
      state.error = null
    })
    .addCase(createDraft.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
    .addCase(postLogin.pending, (state) => {
      state.loadingRequest = true
    })
    .addCase(postLogin.rejected, (state) => {
      state.loadingRequest = false
    })
    .addCase(getPayoutList.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(getPayoutList.fulfilled, (state, { payload: { data } }) => {
      state.loadingRequest = false
      state.error = null
      state.list = data
    })
    .addCase(getPayoutList.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
    .addCase(getMyPayoutList.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(getMyPayoutList.fulfilled, (state, { payload: { data, type } }) => {
      state.loadingRequest = false
      state.error = null

      const key = payoutTypeFilterLegend[type]
      switch (key) {
        case 'accredited': {
          state.accredited = data
          break
        }
        case 'owningTokens': {
          state.owningTokens = data
          break
        }
        case 'claimed': {
          state.claimed = data
          break
        }
      }
    })
    .addCase(getMyPayoutList.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
)
