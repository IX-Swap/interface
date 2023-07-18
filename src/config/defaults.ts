import { PaginationArgs } from 'services/api/types'

export const paginationArgs: PaginationArgs = {
  skip: 0,
  limit: 50
}

export const MIN_INVESTMENT_AMOUNT = 1000

export const capitalStructures = [
  'Equity',
  'Debt',
  'Others'
  // 'Fund - Standalone',
  // 'Fund - Feeder/Sub-Fund'
]

export const tenantThemes = [
  {
    name: 'red',
    hex: 'linear-gradient(to bottom right, #A41523 50%, #FF7033 50%)'
  },
  {
    name: 'orange',
    hex: 'linear-gradient(to bottom right, #E56E00 50% , #C25D00 50%)'
  },
  {
    name: 'green',
    hex: 'linear-gradient(to bottom right, #10BA73 50%, #9BD106 50%)'
  },
  {
    name: 'turquoise',
    hex: 'linear-gradient(to bottom right, #059CA1 50%, #04E3F1 50%)'
  },
  {
    name: 'blue',
    hex: 'linear-gradient(to bottom right, #0E1A32 50%, #0055FF 50%)'
  },
  {
    name: 'pink',
    hex: 'linear-gradient(to bottom right, #1E000E 50%, #FF57A5 50%)'
  },
  {
    name: 'violet',
    hex: 'linear-gradient(to bottom right, #6622CC 50%, #D966FF 50%)'
  }
]

export const fundStatuses = ['Not Funded', 'Funds on Hold', 'Funds Transferred']
export const transferDirections = ['VA to VA', 'Inbound', 'Outbound']
export const idleWarningTime = 1000 * 60 * 15
export const idleLogoutTime = 1000 * 60 * 1
