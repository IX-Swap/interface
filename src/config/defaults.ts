import { PaginationArgs } from 'services/api/types'

export const paginationArgs: PaginationArgs = {
  skip: 0,
  limit: 50
}

export const MIN_INVESTMENT_AMOUNT = 1000

export const capitalStructures = [
  'Equity',
  'Debt',
  'Hybrid',
  'Fund - Standalone',
  'Fund - Feeder/Sub-Fund'
]
export const fundStatuses = ['Not Funded', 'Funds on Hold', 'Funds Transferred']
export const transferDirections = ['VA to VA', 'Inbound', 'Outbound']
export const idleWarningTime = 1000 * 60 * 15
export const idleLogoutTime = 1000 * 60 * 1
