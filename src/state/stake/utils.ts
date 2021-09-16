import { BigNumber } from 'ethers'
import { VestingReward } from './reducer'

export const stakingsAdapter = (transactions: any) => {
  return transactions.map((transaction: any) => ({
    ...transaction,
    originalData: transaction?.originalData.map((data: any) => data.toString()),
  }))
}

export const rewardsAdapter = (transactions: any): VestingReward[] => {
  return transactions.map((transaction: any) => ({
    start: Number(transaction[0].toString()),
    end: Number(transaction[1].toString()),
    amount: transaction[2].toString(),
    claimed: transaction[3].toString(),
    cliff: transaction[4].toString(),
    segments: Number(transaction[5].toString()),
    singlePayout: transaction[6].toString(),
  }))
}

export const payoutsAdapter = (payouts: [BigNumber, BigNumber][]) => {
  return payouts.map((payout: [BigNumber, BigNumber]) => [payout[0].toNumber(), payout[1].toString()])
}
export const claimsAdapter = (claims: BigNumber[]) => {
  return claims.map((claim) => claim.toString())
}
