import { createReducer } from '@reduxjs/toolkit'
import { SecToken } from 'types/secToken'
import { fetchSecTokenList, saveTokens } from './actions'

export interface SecTokenState {
  readonly tokens: SecToken[] | null
  loadingRequest: boolean
  error: string | null
}

const initialState: SecTokenState = {
  tokens: null,
  loadingRequest: false,
  error: null,
}

export default createReducer<SecTokenState>(initialState, (builder) =>
  builder
    .addCase(saveTokens, (state, { payload: { tokens } }) => {
      return {
        ...state,
        tokens,
      }
    })
    .addCase(fetchSecTokenList.pending, (state) => {
      state.loadingRequest = true
      state.error = null
    })
    .addCase(fetchSecTokenList.fulfilled, (state, { payload: { tokenList } }) => {
      state.loadingRequest = false
      state.error = null
      state.tokens = tokenList
    })
    .addCase(fetchSecTokenList.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingRequest = false
      state.error = errorMessage
    })
)
