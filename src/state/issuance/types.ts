import { InvestmentStage } from 'state/launchpad/types'

export interface WhitelistWalletPayload {
  fullName: string
  walletAddress: string
}

export interface WhitelistWallet {
  id: number
  fullName: string
  walletAddress: string
  userId: number
}

export interface IssuanceDataExtract {
  offerId: string
  offerInvestmentId: number
  issuanceName: string
  name: string
  companyName: string
  invesmentAmount: string
  tokenAmount: string
  walletAddress: string
  transactionId: number
  nationality: string
  country: string
  accredited: string
  email: string
  occupation: string
  income: string
  stage: InvestmentStage
  dateOfBirth: string
  wishAmount: string
}

export interface IssuanceDataStatistics {
  totalInvestmentAmount: string
  nameCount: number
  companyNameCount: number
  totalTokenAmount: string
  nationalityCount: string
  countryCount: string
  accreditedCount: string
}

export interface IssuanceDataStatisticsDto {
  investments: IssuanceDataExtract[]
  statistics: IssuanceDataStatistics
}
