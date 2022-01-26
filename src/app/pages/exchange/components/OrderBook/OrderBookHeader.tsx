import { TableHead, TableRow, TableCell, Hidden } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { ValidCurrency } from 'helpers/types'
import { useAssetById } from 'hooks/asset/useAssetById'
import React from 'react'

export interface OrderBookHeaderProps {
  tokenSymbol: string
  currency: ValidCurrency
}

export const OrderBookHeaderCell = withStyles({
  root: {
    borderBottom: '1px solid transparent',
    fontSize: 12
  }
})(TableCell)

export const OrderBookHeader = ({
  tokenSymbol,
  currency
}: OrderBookHeaderProps) => {
  const { data } = useAssetById(currency)

  return (
    <TableHead>
      <TableRow>
        <OrderBookHeaderCell>Price</OrderBookHeaderCell>
        <OrderBookHeaderCell align='right'>
          Amount ({tokenSymbol})
        </OrderBookHeaderCell>
        <Hidden lgDown>
          <OrderBookHeaderCell align='right'>
            Total ({data?.symbol})
          </OrderBookHeaderCell>
        </Hidden>
      </TableRow>
    </TableHead>
  )
}
