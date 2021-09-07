import { VestingResponse } from './types'

export const vestingResponseAdapter = (details: VestingResponse) => {
  const { amount, claimed, cliff, end, segments, singlePayout, start } = details
  return {
    amount: amount?.toString(),
    claimed: claimed?.toString(),
    cliff: cliff?.toNumber(),
    start: start?.toNumber(),
    end: end?.toNumber(),
    segments: segments?.toNumber(),
    singlePayout: singlePayout?.toString(),
  }
}

export const getVestingDates = ({ payouts }: { payouts: [number, string][] }) => {
  return payouts.map((payout) => payout[0])
}
