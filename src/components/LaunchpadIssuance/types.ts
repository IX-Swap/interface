export enum IssuanceFilter { 
  live = 'live',
  pending = 'pending',
  old = 'old'
}

export enum IssuanceStatus {
  approved = 'approvet',
  rejected = 'rejected',
  inProgress = 'inProgress',
  changeRequested = 'changeRequested',
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
  IssuanceStatus.rejected,
  IssuanceStatus.inProgress,
  IssuanceStatus.changeRequested,
  IssuanceStatus.pendingApproval,
]

