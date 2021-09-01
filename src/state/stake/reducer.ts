import { createReducer } from '@reduxjs/toolkit'
import {
  saveStakingStatus,
  setOneWeekAPY,
  setOneMonthAPY,
  setTwoMonthsAPY,
  setThreeMonthsAPY,
  selectTier,
} from './actions'

export enum StakingStatus {
  CONNECT_WALLET = 'CONNECT_WALLET',
  NO_IXS = 'NO_IXS',
  NO_STAKE = 'NO_STAKE',
  STAKING = 'STAKING',
}

export enum PERIOD {
  ONE_WEEK = '1 week',
  ONE_MONTH = '1 month',
  TWO_MONTHS = '2 months',
  THREE_MONTHS = '3 months',
}

export enum TIER_LIMIT {
  UNLIMITED = 'Unlimited',
  TWO_MLN = '2 mln limit',
}

// APY in percents
export interface APY {
  oneWeek: number | undefined
  oneMonth: number | undefined
  twoMonths: number | undefined
  threeMonths: number | undefined
}

export interface Tier {
  period: PERIOD
  APY: number
  limit: TIER_LIMIT
  lockupPeriod: PERIOD
}

export interface TierType {
  oneWeek: Tier
  oneMonth: Tier
  twoMonths: Tier
  threeMonths: Tier
}

export const TIER_TYPES: TierType = {
  oneWeek: {
    period: PERIOD.ONE_WEEK,
    APY: 5,
    limit: TIER_LIMIT.UNLIMITED,
    lockupPeriod: PERIOD.ONE_WEEK,
  },
  oneMonth: {
    period: PERIOD.ONE_MONTH,
    APY: 18,
    limit: TIER_LIMIT.TWO_MLN,
    lockupPeriod: PERIOD.ONE_MONTH,
  },
  twoMonths: {
    period: PERIOD.TWO_MONTHS,
    APY: 44,
    limit: TIER_LIMIT.TWO_MLN,
    lockupPeriod: PERIOD.ONE_MONTH,
  },
  threeMonths: {
    period: PERIOD.THREE_MONTHS,
    APY: 88,
    limit: TIER_LIMIT.TWO_MLN,
    lockupPeriod: PERIOD.TWO_MONTHS,
  },
}

interface StakingState {
  status: StakingStatus
  APY: APY
  selectedTier?: Tier
}

const initialState: StakingState = {
  status: StakingStatus.CONNECT_WALLET,
  APY: {
    oneWeek: 5,
    oneMonth: 18,
    twoMonths: 44,
    threeMonths: 88,
  },
  selectedTier: undefined,
}

export default createReducer<StakingState>(initialState, (builder) =>
  builder
    .addCase(saveStakingStatus, (state, { payload: { status } }) => {
      console.log('staking status: ', status)
      state.status = status
    })
    .addCase(setOneWeekAPY, (state, { payload: { oneWeekAPY } }) => {
      state.APY.oneWeek = oneWeekAPY
    })
    .addCase(setOneMonthAPY, (state, { payload: { oneMonthAPY } }) => {
      state.APY.oneMonth = oneMonthAPY
    })
    .addCase(setTwoMonthsAPY, (state, { payload: { twoMonthsAPY } }) => {
      state.APY.twoMonths = twoMonthsAPY
    })
    .addCase(setThreeMonthsAPY, (state, { payload: { threeMonthsAPY } }) => {
      state.APY.threeMonths = threeMonthsAPY
    })
    .addCase(selectTier, (state, { payload: { tier } }) => {
      state.selectedTier = tier
    })
)
