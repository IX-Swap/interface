import { formatMoney } from 'helpers/numbers'
import { TableColumn } from 'types/util'
import { getUserNameById } from 'helpers/tables'
import React from 'react'
import { Box } from '@mui/material'

export interface Order {
  createdAt: string
  pair: string
  side: string
  price: number
  amount: number
  total: number
  filled: number
}

export const columns: Array<TableColumn<any>> = [
  {
    key: 'name',
    label: <Box paddingLeft={3}>Pair</Box>
  },
  {
    label: 'Symbol',
    key: 'listing.tokenSymbol'
  },
  {
    key: 'listing.tokenName',
    label: 'Name'
  },
  {
    key: 'listing.createdBy',
    label: 'Issued By',
    align: 'center',
    headAlign: 'center',
    render: (_, value) => getUserNameById(value.listing.createdBy)
  },

  {
    key: 'listing.minimumTradeUnits',
    label: 'Price',
    align: 'left',
    headAlign: 'left',
    render: (_, value) => formatMoney(value.listing.minimumTradeUnits, '')
  },
  {
    key: 'listing.marketType',
    label: 'Type'
  }
]
