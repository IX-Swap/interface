export interface SubFundStats {
  currency: string
  totalInvestors: number
  totalDSOs: number
  pendingAuthorizations: number
  totalAmountRaised: number
  totalAmountRaisedPercent: number
  topInvestors: TopInvestor[]
  assetsUnderManagement: AssetUnderManagement[]
}

export interface InvestmentStats {
  [key: string]: {
    dsoName: string
    data: Array<{
      count: number
      month: string
      year: string
    }>
  }
}

export interface TopInvestor {
  dsoId: string
  dsoName: string
  investorName: string
  amount: number
}

export interface AssetUnderManagement {
  dsoId: string
  dsoName: string
  amount: number
  totalAmount: number
  percent: number
}
