import { createSlice } from '@reduxjs/toolkit'
import { Pool } from 'services/pool/types'

interface PoolStakingState {
  currentPool: Pool | undefined
  poolGaugeQuery: any
}

const initialState: PoolStakingState = {
  currentPool: undefined,
  poolGaugeQuery: {},
}

const poolStakingSlice = createSlice({
  name: 'poolstaking',
  initialState,
  reducers: {
    setPoolStakingState(state, action) {
      const newState = { ...state, ...action.payload }

      return newState
    },
    setPoolGaugeQuery(state, action) {
      state.poolGaugeQuery = action.payload
    },
  },
})

export const { setPoolGaugeQuery, setPoolStakingState } = poolStakingSlice.actions

export default poolStakingSlice.reducer
