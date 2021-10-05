import { createReducer } from '@reduxjs/toolkit'
import { saveAuthorization } from './actions'
import { SwapHelperState } from './typings'

export const initialState: SwapHelperState = { authorization: null }

export default createReducer(initialState, (builder) =>
  builder.addCase(saveAuthorization, (state, { payload: { authorization } }) => {
    state.authorization = authorization
  })
)
