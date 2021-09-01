import { createAction } from '@reduxjs/toolkit'
import { StakingStatus } from 'state/stake/reducer'

export const saveStakingStatus = createAction<{ status: StakingStatus }>('stake/saveStakingStatus')
