
export const DAILY_REWARD = 100

export const JOIN_CAMPAIGN_REWARD = 100

export const KYC_REWARD = 1_000

export const INVEST_REWARD_PER_TOKEN = 1_000

export enum LineRewardAction {
  CONNECT_WALLET = 'connect_wallet',
  KYC = 'kyc',
  INVEST = 'invest',
  JOIN_CAMPAIGN = 'join_campaign',
}

export const API_KEY = process.env.REACT_APP_LINE_REWARD_API_KEY
