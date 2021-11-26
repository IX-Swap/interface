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
  totalFilled: number
  _id: string
  pair: Pair
  side: string
  price: number
  amount: number
  createdAt: string
  type: string
  unrealizedPnl: number
  costValue: number
  lastTradePrice: number
  currentValue: number
}

export interface OpenPositionsTotal {
  totalCostPrice: number
  totalCurrentValue: number
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

export interface ExchangeFill {
  _id: string
  pair: {
    _id: string
    listing: string
    name: string
    quote: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  side: string
  price: number
  amount: number
  createdAt: string
  id: string
}
