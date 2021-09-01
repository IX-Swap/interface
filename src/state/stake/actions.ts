import { createAction } from '@reduxjs/toolkit'
import { StakingStatus, Tier } from 'state/stake/reducer'

export const saveStakingStatus = createAction<{ status: StakingStatus }>('stake/saveStakingStatus')

export const setOneWeekAPY = createAction<{ oneWeekAPY: number }>('stake/setOneWeekAPY')
export const setOneMonthAPY = createAction<{ oneMonthAPY: number }>('stake/setOneMonthAPY')
export const setTwoMonthsAPY = createAction<{ twoMonthsAPY: number }>('stake/setTwoMonthsAPY')
export const setThreeMonthsAPY = createAction<{ threeMonthsAPY: number }>('stake/setThreeMonthsAPY')
export const selectTier = createAction<{ tier: Tier }>('stake/selectTier')
