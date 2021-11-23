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
