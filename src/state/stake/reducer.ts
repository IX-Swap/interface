import { createReducer } from '@reduxjs/toolkit'
import { StakingStatus } from 'pages/Farming/Staking'
import { saveStakingStatus } from './actions'

interface StakingState {
  status: StakingStatus
}
const initialState: StakingState = {
  status: StakingStatus.CONNECT_WALLET,
}
export default createReducer<StakingState>(initialState, (builder) =>
  builder.addCase(saveStakingStatus, (state, { payload: { status } }) => {
    state.status = status
  })
)
