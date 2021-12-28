import { createReducer } from '@reduxjs/toolkit'
import { IStaking } from 'constants/stakingPeriods'
import {
  changeAccount,
  checkAllowance,
  getAvailableClaim,
  getIsStakingPaused,
  getPayouts,
  getRewards,
  getStakings,
  increaseAllowance,
  saveStakingStatus,
  selectTier,
  setTransactionInProgress,
  stake,
  setTypedValue,
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

export function convertPeriod(period?: PERIOD): string {
  switch (period) {
    case PERIOD.ONE_WEEK: {
      return 'week'
    }
    case PERIOD.ONE_MONTH: {
      return 'month'
    }
    case PERIOD.TWO_MONTHS: {
      return 'two_months'
    }
    case PERIOD.THREE_MONTHS: {
      return 'three_months'
    }
  }
  return 'week'
}

export enum TIER_LIMIT {
  UNLIMITED = 'Unlimited',
  TWO_MLN = '2 mln limit',
}

// APY in percents
export interface APY {
  [PERIOD.ONE_WEEK]: number | undefined
  [PERIOD.ONE_MONTH]: number | undefined
  [PERIOD.TWO_MONTHS]: number | undefined
  [PERIOD.THREE_MONTHS]: number | undefined
}

export interface Tier {
  period: PERIOD
  APY: number
  limit: TIER_LIMIT
  lockupPeriod: PERIOD
}

export interface TierType {
  [PERIOD.THREE_MONTHS]: Tier
  [PERIOD.ONE_WEEK]: Tier
  [PERIOD.ONE_MONTH]: Tier
  [PERIOD.TWO_MONTHS]: Tier
}
export interface VestingReward {
  start: number
  end: number
  amount: string
  claimed: string
  cliff: string
  segments: number
  singlePayout: string
}

export const TIER_TYPES: TierType = {
  [PERIOD.ONE_WEEK]: {
    period: PERIOD.ONE_WEEK,
    APY: 5,
    limit: TIER_LIMIT.UNLIMITED,
    lockupPeriod: PERIOD.ONE_WEEK,
  },
  [PERIOD.ONE_MONTH]: {
    period: PERIOD.ONE_MONTH,
    APY: 18,
    limit: TIER_LIMIT.TWO_MLN,
    lockupPeriod: PERIOD.ONE_MONTH,
  },
  [PERIOD.TWO_MONTHS]: {
    period: PERIOD.TWO_MONTHS,
    APY: 44,
    limit: TIER_LIMIT.TWO_MLN,
    lockupPeriod: PERIOD.ONE_MONTH,
  },
  [PERIOD.THREE_MONTHS]: {
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
  isApprovingIXS: boolean
  approveIXSError: boolean
  isIXSApproved: boolean
  isStaking: boolean
  isStakingFailed: boolean
  hasStakedSuccessfully: boolean
  stakings: IStaking[]
  stakingsLoading: boolean
  rewardsLoading: boolean
  isPaused: boolean
  metaMaskAccount: string | null
  allowanceAmount: number
  rewards: VestingReward[]
  payouts: [number, string][][]
  claims: any[]
  payoutsLoading: boolean
  claimLoading: boolean
  transactionInProgress: boolean
  typedValue: string
}

const initialState: StakingState = {
  status: StakingStatus.CONNECT_WALLET,
  APY: {
    [PERIOD.ONE_WEEK]: 5,
    [PERIOD.ONE_MONTH]: 18,
    [PERIOD.TWO_MONTHS]: 44,
    [PERIOD.THREE_MONTHS]: 88,
  },
  selectedTier: undefined,
  isApprovingIXS: false,
  approveIXSError: false,
  isIXSApproved: false,
  isStaking: false,
  isStakingFailed: false,
  hasStakedSuccessfully: false,
  stakings: [],
  stakingsLoading: false,
  isPaused: false,
  metaMaskAccount: localStorage.getItem('account'),
  allowanceAmount: 0,
  rewards: [],
  rewardsLoading: false,
  payouts: [],
  claims: [],
  payoutsLoading: false,
  claimLoading: false,
  transactionInProgress: false,
  typedValue: '',
}

export default createReducer<StakingState>(initialState, (builder) =>
  builder
    .addCase(saveStakingStatus, (state, { payload: { status } }) => {
      state.status = status
    })
    .addCase(changeAccount, (state, { payload: { newAccount } }) => {
      state.metaMaskAccount = newAccount
      localStorage.setItem('account', newAccount)
      if (newAccount === 'null') {
        state.stakings = []
      }
    })
    .addCase(selectTier, (state, { payload: { tier } }) => {
      state.selectedTier = tier
    })
    .addCase(checkAllowance, (state, { payload: { allowanceAmount } }) => {
      state.allowanceAmount = allowanceAmount
    })
    .addCase(increaseAllowance.pending, (state) => {
      state.isApprovingIXS = true
      state.approveIXSError = false
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .addCase(increaseAllowance.fulfilled, (state, { payload: { data } }) => {
      state.isApprovingIXS = false
      state.approveIXSError = false
      state.isIXSApproved = true
    })
    .addCase(increaseAllowance.rejected, (state, { payload: { errorMessage } }) => {
      state.isApprovingIXS = false
      state.approveIXSError = true
      console.error('IXS approve error: ', errorMessage)
    })
    .addCase(stake.pending, (state) => {
      state.hasStakedSuccessfully = false
      state.isStaking = true
      state.isStakingFailed = false
    })
    .addCase(stake.fulfilled, (state, { payload: { txStatus } }) => {
      state.isStaking = false
      if (txStatus === 1) {
        state.hasStakedSuccessfully = true
        state.isStakingFailed = false
      } else {
        state.hasStakedSuccessfully = false
        state.isStakingFailed = true
      }
    })
    .addCase(stake.rejected, (state, { payload: { errorMessage } }) => {
      state.isStaking = false
      state.isStakingFailed = true
      state.hasStakedSuccessfully = false
      console.error('IXS staking error: ', errorMessage)
    })
    .addCase(getStakings.pending, (state) => {
      state.stakingsLoading = true
    })
    .addCase(getStakings.fulfilled, (state, { payload: { transactions } }) => {
      state.stakings = transactions
      state.stakingsLoading = false
    })
    .addCase(getStakings.rejected, (state, { payload: { errorMessage } }) => {
      state.stakingsLoading = false
      console.error('Error on fetch staking transactions: ', errorMessage)
    })
    .addCase(getRewards.pending, (state) => {
      state.rewardsLoading = true
    })
    .addCase(getRewards.fulfilled, (state, { payload: { transactions } }) => {
      state.rewards = transactions
      state.rewardsLoading = false
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .addCase(getRewards.rejected, (state, { payload: { errorMessage } }) => {
      state.rewardsLoading = false
    })
    .addCase(getPayouts.pending, (state) => {
      state.payoutsLoading = true
    })
    .addCase(getPayouts.fulfilled, (state, { payload: { transactions } }) => {
      state.payouts = transactions
      state.payoutsLoading = false
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .addCase(getPayouts.rejected, (state, { payload: { errorMessage } }) => {
      state.payoutsLoading = false
    })
    .addCase(getAvailableClaim.pending, (state) => {
      state.claimLoading = true
    })
    .addCase(getAvailableClaim.fulfilled, (state, { payload: { transactions } }) => {
      state.claims = transactions
      state.claimLoading = false
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .addCase(getAvailableClaim.rejected, (state, { payload: { errorMessage } }) => {
      state.claimLoading = false
    })
    .addCase(setTransactionInProgress, (state, { payload: { value } }) => {
      state.transactionInProgress = value
    })
    .addCase(getIsStakingPaused, (state, { payload: { isPaused } }) => {
      state.isPaused = isPaused
    })
    .addCase(setTypedValue, (state, { payload: { typed } }) => {
      state.typedValue = typed
    })
)
