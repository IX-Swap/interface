import { createAction } from '@reduxjs/toolkit'
import { StakingStatus } from 'pages/Farming/Staking'

export const saveStakingStatus = createAction<{ status: StakingStatus }>('stake/saveStakingStatus')
