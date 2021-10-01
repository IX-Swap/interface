import { BigNumber } from 'ethers'
import { VestingStatus } from 'pages/Farming/Vesting/Vesting'

export interface VestingResponse {
  start?: BigNumber
  end?: BigNumber
  amount?: BigNumber
  claimed?: BigNumber
  cliff?: BigNumber
  segments?: BigNumber
  singlePayout?: BigNumber
}

export interface VestingDetails {
  start?: number
  end?: number
  amount?: string
  claimed?: string
  cliff?: number
  segments?: number
  singlePayout?: string
}

export interface VestingState {
  loadingVesting: boolean
  vestingError: string | null
  isVesting: boolean
  availableClaim: string
  details: VestingDetails | null
  payouts: [number, string][]
  customVestingAddress: string
  vestingStatus: VestingStatus
  loadingDetails: boolean
  loadingIsVesting: boolean
  loadingPayouts: boolean
  loadingAvailableClaim: boolean
  loadingClaimAll: boolean
  privateBuyer: { amount: string; isVerified: boolean; months: number }
}
