import { createReducer  } from '@reduxjs/toolkit'

import { toggleKYCDialog } from './actions'

export interface LaunchpadState {
  readonly isKYCModalOpen: boolean
}

const initialState: LaunchpadState = {
  isKYCModalOpen: false
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(toggleKYCDialog, (state, action) => { 
      state.isKYCModalOpen = action.payload.open 
    })
)
