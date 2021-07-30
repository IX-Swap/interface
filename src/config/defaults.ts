import { PaginationArgs } from 'services/api/types'

export const paginationArgs: PaginationArgs = {
  skip: 0,
  limit: 50
}

export const MIN_INVESTMENT_AMOUNT = 1000

export const capitalStructures = ['Equity', 'Debt', 'Hybrid']
export const fundStatuses = ['Not Funded', 'Funds on Hold', 'Funds Transferred']
