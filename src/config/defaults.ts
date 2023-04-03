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

export const tenantThemes = [
  {
    name: 'red',
    hex: '#F24822'
  },
  {
    name: 'orange',
    hex: '#f39c12'
  },
  {
    name: 'yellow',
    hex: '#FFCD29'
  },
  {
    name: 'green',
    hex: '#85E0A3'
  },
  {
    name: 'blue',
    hex: '#00a8ff'
  },
  {
    name: 'indigo',
    hex: '#3E68FF'
  },
  {
    name: 'violet',
    hex: '#9747FF'
  }
]

export const fundStatuses = ['Not Funded', 'Funds on Hold', 'Funds Transferred']
export const transferDirections = ['VA to VA', 'Inbound', 'Outbound']
export const idleWarningTime = 1000 * 60 * 15
export const idleLogoutTime = 1000 * 60 * 1
