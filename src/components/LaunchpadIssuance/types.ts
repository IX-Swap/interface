export enum IssuanceFilter { 
  live = 'live',
  pending = 'pending',
  old = 'old'
}

export enum IssuanceStatus {
  draft = 'draft',
  approved = 'approved',
  declined = 'declined',
  inProgress = 'inProgress',
  changesRequested = 'changesRequested',
  pendingApproval = 'pendingApproval'
}

export interface Issuance {
  issuer: string
  startDate: Date
  status: IssuanceStatus
}

export const issuers = [
  "McDonald's",
  "The Walt Disney Company",
  "Starbucks",
  "Louis Vuitton",
]


export const statuses = [
  IssuanceStatus.approved,
  IssuanceStatus.declined,
  IssuanceStatus.inProgress,
  IssuanceStatus.changesRequested,
  IssuanceStatus.pendingApproval,
]

export enum SMART_CONTRACT_STRATEGIES {
  original = 'original', //  IX Swap Originated Primary Offering
  nonOriginalWithAccess = 'nonOriginalWithAccess', // Non-IXS Originated Primary Offering with Smart Contract Minting & Whitelisting Access
  nonOriginalWithNoAccess = 'nonOriginalWithNoAccess', // Non-IXS Originated Primary Offering with NO access to Token Smart Contract
}

export enum PublicDetails { 
  buy = 'buy',
  sell = 'sell',
}