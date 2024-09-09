import { createSlice } from '@reduxjs/toolkit'

export interface GlobalState {
  selectedTenant: any | null
}

const initialState: GlobalState = {
  selectedTenant: null,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalState(state, action) {
      const newState = { ...state, ...action.payload }

      return newState
    },
    resetGlobaltate: () => initialState,
  },
})

export const { setGlobalState, resetGlobaltate } = globalSlice.actions
export default globalSlice.reducer
