export enum PAYOUT_TYPE {
  DIVIDENDS = 'dividends',
  REWARDS = 'rewards',
  INTEREST = 'interest',
  ROYALTIES = 'royalties',
  AIRDROPS = 'airdrops',
  OTHERS = 'other',
}

export const PAYOUT_TYPE_LABEL = {
  [PAYOUT_TYPE.DIVIDENDS]: 'Dividends',
  [PAYOUT_TYPE.REWARDS]: 'Rewards',
  [PAYOUT_TYPE.INTEREST]: 'Interest',
  [PAYOUT_TYPE.ROYALTIES]: 'Royalties',
  [PAYOUT_TYPE.AIRDROPS]: 'Airdrops',
  [PAYOUT_TYPE.OTHERS]: 'Others',
} as Record<string, string>
