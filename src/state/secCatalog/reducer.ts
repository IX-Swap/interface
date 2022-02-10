import { createReducer } from '@reduxjs/toolkit'

import { fetchIssuers, fetchIssuersTokens } from './actions'

export interface Issuer {
  name: string
  url: string
  logo?: any
  description?: string
  tokens?: any[]
}

export interface SecCatalogState {
  readonly issuers: Issuer[] | null
  loadingRequest: boolean
  error: string | null
  tokens: any
}

const initialState: SecCatalogState = {
  issuers: null,
  loadingRequest: false,
  error: null,
  tokens: null,
}

export default createReducer<SecCatalogState>(initialState, (builder) =>
  builder
    .addCase(fetchIssuers.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(fetchIssuers.fulfilled, (state, { payload: { data } }) => {
      state.loadingRequest = false
      state.error = null
      state.issuers = data
    })
    .addCase(fetchIssuers.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
    .addCase(fetchIssuersTokens.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(fetchIssuersTokens.fulfilled, (state, { payload: { data } }) => {
      state.loadingRequest = false
      state.error = null
      state.tokens = data
    })
    .addCase(fetchIssuersTokens.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
)
