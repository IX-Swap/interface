export interface ReportsItem {
  name: string
  type: string
  href: string
}

export interface AccountInfo {
  name: string
  accountType: string
  customerType: string
  basedCurrency: {
    virtualAccount: string
    currency: string
  }
  date: string
}

export interface Pair {
  _id: string
  listing: string
  name: string
  quote: string
  createdAt: string
  updatedAt: string
  __v: 0
}

export interface OpenPositionItem {
  amount: number
  average: number
  costValue: number
  currentValue: number
  date: string
  filled: number
  filledPercent: number
  lastTradePrice: number
  name: string
  pair: string
  pairId: string
  price: number
  side: string
  status: string
  timeInForce: string
  total: number
  type: string
  unrealizedPnl: number
  _id: string
}

export interface OpenPositionsTotal {
  totalCostPrice: number
  totalCurrentValue: number
  totalUnrealizedPnl: number
}

export interface CashReports {
  _id: string
  currency: string
  startingCash: number
  fees: number
  withdrawals: number
  endingCash: number
}

export interface ActivitySummary {
  openPositions: OpenPositionItem[]
  openPositionsTotal: OpenPositionsTotal
  cashReports: CashReports
}

export interface TradeConfirmationItem {
  _id: string
  pair: Pair
  side: string
  price: number
  amount: number
  createdAt: string
  id: string
}
