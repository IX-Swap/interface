import { createReducer  } from '@reduxjs/toolkit'

import { setAllowOnlyAccredited, toggleKYCDialog } from './actions'

export interface LaunchpadState {
  readonly isKYCModalOpen: boolean
  readonly allowOnlyAccredited: boolean
}

const initialState: LaunchpadState = {
  isKYCModalOpen: false,
  allowOnlyAccredited: false
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(toggleKYCDialog, (state, action) => { 
      state.isKYCModalOpen = action.payload.open
    })
    .addCase(setAllowOnlyAccredited, (state, action) => { 
      state.allowOnlyAccredited = action.payload.allowOnlyAccredited
    })
    
)
