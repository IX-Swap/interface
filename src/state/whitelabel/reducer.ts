import { createReducer } from '@reduxjs/toolkit'

import { getWhitelabelConfig } from './actions'
import { Whitelabel } from './types'

export interface WhitelabelState {
  config: Whitelabel | null
  error: null | string
  isLoading: boolean
}

const initialState: WhitelabelState = {
  config: window.location.host.split('.')[1] === 'ixswap' ? ({} as Whitelabel) : null,
  error: null,
  isLoading: false,
}

export default createReducer<WhitelabelState>(initialState, (builder) =>
  builder
    .addCase(getWhitelabelConfig.pending, (state) => {
      state.isLoading = true
      state.error = null
      state.config = null
    })
    .addCase(getWhitelabelConfig.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      console.log('log => payload', payload)

      state.config = {
        ...payload,
        tokens: JSON.parse(payload.tokens || '[]'),
        colors: JSON.parse(payload.colors || '{}'),
        pages: JSON.parse(payload.pages || '[]'),
        customStyles: JSON.parse(payload.customStyles || '{}'),
        footerConfig: JSON.parse(payload.footerConfig || '{}'),
      }
    })
    .addCase(getWhitelabelConfig.rejected, (state, { payload: { errorMessage } }) => {
      state.isLoading = false
      state.error = errorMessage
      state.config = {} as Whitelabel
    })
)
