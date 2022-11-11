import { createReducer, nanoid } from '@reduxjs/toolkit'
import { toggleKYCDialog } from './actions'

export interface LaunchpadState {
  isKYCModalOpen: boolean
}

const initialState: LaunchpadState = {
  isKYCModalOpen: false
}

export default createReducer(initialState, (builder) =>
  builder.addCase(toggleKYCDialog, (state, action) => { state.isKYCModalOpen = !state.isKYCModalOpen })
)
