import { createReducer } from '@reduxjs/toolkit'
import { setFaucetLoading } from './actions'

export interface FaucetState {
  readonly loadingFaucet: boolean
}

const initialState: FaucetState = {
  loadingFaucet: false,
}

export default createReducer<FaucetState>(initialState, (builder) =>
  builder.addCase(setFaucetLoading, (state, { payload: { loading } }) => {
    state.loadingFaucet = loading
  })
)
