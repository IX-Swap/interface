import { formatMoney } from 'helpers/numbers'
import { TableColumn } from 'types/util'
// import { getUserNameById } from 'helpers/tables'
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
    label: <Box sx={{ paddingLeft: { xs: 0, lg: 2 } }}>Pair</Box>
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
    align: 'left',
    headAlign: 'left',
    // TODO Should add real createdBy name value from backend api
    // render: (_, value) => getUserNameById(value.listing.createdBy)
    render: (_, value) => 'Alexandr Polchevsky'
  },

  {
    key: 'listing.minimumTradeUnits',
    label: 'Price',
    align: 'left',
    headAlign: 'left',
    // TODO Should add real currency value from backend api
    render: (_, value) =>
      formatMoney(value.listing.minimumTradeUnits, 'SGD', true)
  },
  {
    key: 'listing.marketType',
    label: 'Type'
  }
]
