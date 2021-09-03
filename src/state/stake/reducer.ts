import { createReducer } from '@reduxjs/toolkit'
import { saveStakingStatus, increaseAllowance, selectTier, stake, getStakings } from './actions'

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

interface StakeTransaction {
  apy: number
  canUnstake: boolean
  distributeAmount: number
  endDate: string
  lock_months: number
  lockedTill: string
  originalData: any
  originalIndex: number
  period: string
  reward: number
  stakeAmount: number
  startDate: string
  unixStart: number
}

interface StakingState {
  status: StakingStatus
  APY: APY
  selectedTier?: Tier
  approvingIXS: boolean
  approveIXSError: boolean
  isIXSApproved: boolean
  isStaking: boolean
  isStakingFailed: boolean
  hasStakedSuccessfully: boolean
  stakings: StakeTransaction[]
  historicalPoolSize: {
    oneWeek: number
    oneMonth: number
    twoMonths: number
    threeMonths: number
    isOneWeekLoading: boolean
    isOneMonthLoading: boolean
    isTwoMonthsLoading: boolean
    isThreeMonthsLoading: boolean
  }
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
  approvingIXS: false,
  approveIXSError: false,
  isIXSApproved: false,
  isStaking: false,
  isStakingFailed: false,
  hasStakedSuccessfully: false,
  stakings: [],
  historicalPoolSize: {
    oneWeek: 0,
    oneMonth: 0,
    twoMonths: 0,
    threeMonths: 0,
    isOneWeekLoading: false,
    isOneMonthLoading: false,
    isTwoMonthsLoading: false,
    isThreeMonthsLoading: false,
  },
}

export default createReducer<StakingState>(initialState, (builder) =>
  builder
    .addCase(saveStakingStatus, (state, { payload: { status } }) => {
      console.log('staking status: ', status)
      state.status = status
    })
    .addCase(selectTier, (state, { payload: { tier } }) => {
      state.selectedTier = tier
    })
    .addCase(increaseAllowance.pending, (state) => {
      state.approvingIXS = true
      state.approveIXSError = false
    })
    .addCase(increaseAllowance.fulfilled, (state, { payload: { data } }) => {
      state.approvingIXS = false
      state.approveIXSError = false
      state.isIXSApproved = true
      console.log('IXS has been approved: ', data)
    })
    .addCase(increaseAllowance.rejected, (state, { payload: { errorMessage } }) => {
      state.approvingIXS = false
      state.approveIXSError = true
      console.error('IXS approve error: ', errorMessage)
    })
    .addCase(stake.pending, (state) => {
      state.isStaking = true
      state.isStakingFailed = false
    })
    .addCase(stake.fulfilled, (state, { payload: { data } }) => {
      state.isStaking = false
      state.isStakingFailed = false
      state.hasStakedSuccessfully = true
      console.log('IXS has been staked: ', data)
    })
    .addCase(stake.rejected, (state, { payload: { errorMessage } }) => {
      state.isStaking = false
      state.isStakingFailed = true
      state.hasStakedSuccessfully = false
      console.error('IXS staking error: ', errorMessage)
    })
    .addCase(getStakings.pending, (state) => {
      console.log('Fetching staking transactions...')
    })
    .addCase(getStakings.fulfilled, (state, { payload: { transactions } }) => {
      state.stakings = transactions
      console.log('staking transactions: ', transactions)
    })
    .addCase(getStakings.rejected, (state, { payload: { errorMessage } }) => {
      console.error('Error on fetch staking transactions: ', errorMessage)
    })
)
