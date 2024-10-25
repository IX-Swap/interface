import { createSlice } from '@reduxjs/toolkit'

export interface JumpTaskState {
  transactionId: string
  affUnique1: string
}

const initialState: JumpTaskState = {
  transactionId: '',
  affUnique1: '',
}

const jumpTaskSlice = createSlice({
  name: 'jumpTask',
  initialState,
  reducers: {
    setJumpTaskState(state, action) {
      const newState = { ...state, ...action.payload }

      return newState
    },
    resetJumpTaskState: () => initialState,
  },
})

export const { setJumpTaskState, resetJumpTaskState } = jumpTaskSlice.actions
export default jumpTaskSlice.reducer
