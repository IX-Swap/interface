import { createReducer } from '@reduxjs/toolkit'
import { saveStakingStatus } from './actions'

export enum StakingStatus {
  CONNECT_WALLET = 'CONNECT_WALLET',
  NO_IXS = 'NO_IXS',
  NO_STAKE = 'NO_STAKE',
  STAKING = 'STAKING',
}

interface StakingState {
  status: StakingStatus
}
const initialState: StakingState = {
  status: StakingStatus.CONNECT_WALLET,
}
export default createReducer<StakingState>(initialState, (builder) =>
  builder.addCase(saveStakingStatus, (state, { payload: { status } }) => {
    console.log('staking status: ', status)
    state.status = status
  })
)
