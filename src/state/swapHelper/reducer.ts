import { createReducer } from '@reduxjs/toolkit'
import { saveAuthorization } from './actions'
import { SwapHelperState } from './typings'

export const initialState: SwapHelperState = { authorizations: {} }

export default createReducer(initialState, (builder) =>
  builder.addCase(saveAuthorization, (state, { payload: { authorization, chainId, address } }) => {
    return {
      ...state,
      authorizations: {
        ...state.authorizations,
        [chainId]: {
          ...state.authorizations[chainId],
          [address]: authorization,
        },
      },
    }
  })
)
