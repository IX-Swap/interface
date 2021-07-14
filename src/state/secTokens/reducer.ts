import { createReducer } from '@reduxjs/toolkit'
import { SecToken } from 'types/secToken'
import { saveTokens } from './actions'

export interface SecTokenState {
  readonly tokens: SecToken[] | null
}

const initialState: SecTokenState = {
  tokens: null,
}

export default createReducer<SecTokenState>(initialState, (builder) =>
  builder.addCase(saveTokens, (state, { payload: { tokens } }) => {
    return {
      ...state,
      tokens,
    }
  })
)
