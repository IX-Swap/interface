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
  cashReports: CashReports[]
}

export interface TradeItem {
  _id: string
  price: number
  createdAt: string
  pair: string
  quantity: number
  total: number
  fee: number
  type: string
}

export interface Account {
  _id: string
  user: string
  amount: number
  description: string
  currency: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface FeeAndCharges {
  usd: Account[]
  totalUsd: number
  sgd: Account[]
  totalSgd: number
}

export interface Dividend {
  _id: string
  currency: string
  createdAt: string
  dividendPerShare: number
  numberOfToken: number
  totalAmount: number
  tokenSymbol: string
}
