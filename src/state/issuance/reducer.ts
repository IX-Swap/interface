import { createReducer } from '@reduxjs/toolkit'
import { WhitelistFilter, WhiteListType } from 'services/types'
import { getDefaultPaginatedResponse, PaginateResponse } from 'types/pagination'
import {
  deleteWhitelistedWallet,
  getWhitelistedWallets,
  resetWhitelistWalletErrors,
  saveWhitelistedWallet,
  setFilterValue,
} from './actions'
import { WhitelistWallet } from './types'

const defaultFilter = {
  page: 1,
  offset: 4,
  type: WhiteListType.MANUAL,
}
export interface WhitelistWalletStatusState {
  filter: WhitelistFilter
  whitelisted: PaginateResponse<WhitelistWallet>
  loadingGet: boolean
  loadingSave: boolean
  loadingDelete: boolean
  getError: string | null
  saveError: string | null
  deleteError: string | null
}

const initialState: WhitelistWalletStatusState = {
  loadingGet: false,
  loadingSave: false,
  loadingDelete: false,
  getError: null,
  saveError: null,
  deleteError: null,
  filter: defaultFilter,
  whitelisted: getDefaultPaginatedResponse<WhitelistWallet>(),
}

export default createReducer<WhitelistWalletStatusState>(initialState, (builder) =>
  builder
    .addCase(getWhitelistedWallets.pending, (state) => {
      state.loadingGet = true
      state.getError = null
    })
    .addCase(getWhitelistedWallets.fulfilled, (state, { payload }) => {
      state.loadingGet = false
      state.getError = null
      state.whitelisted = payload.data
    })
    .addCase(getWhitelistedWallets.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingGet = false
      state.getError = errorMessage
      state.whitelisted = getDefaultPaginatedResponse<WhitelistWallet>()
    })
    .addCase(saveWhitelistedWallet.pending, (state) => {
      state.loadingSave = true
      state.saveError = null
    })
    .addCase(saveWhitelistedWallet.fulfilled, (state) => {
      state.loadingSave = false
      state.saveError = null
    })
    .addCase(saveWhitelistedWallet.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingSave = false
      state.saveError = errorMessage
    })
    .addCase(deleteWhitelistedWallet.pending, (state) => {
      state.loadingDelete = true
      state.deleteError = null
    })
    .addCase(deleteWhitelistedWallet.fulfilled, (state) => {
      state.loadingDelete = false
    })
    .addCase(deleteWhitelistedWallet.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingDelete = false
      state.deleteError = errorMessage
    })
    .addCase(setFilterValue, (state, { payload }) => {
      if (!payload.filter) {
        state.filter = defaultFilter
      }
      state.filter = { ...state.filter, ...payload.filter }
    })
    .addCase(resetWhitelistWalletErrors, (state) => {
      state.getError = null
      state.saveError = null
    })
)
