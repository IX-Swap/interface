import { Grid, Typography } from '@mui/material'
import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import React from 'react'
import { OrderType, OTCOrder } from 'types/otcOrder'
import { getColumns } from './columns'

export interface UnmatchedOrdersProps {
  side: OrderType
  title: string
}
export const UnmatchedOrders = ({ side, title }: UnmatchedOrdersProps) => {
  return (
    <Grid item container direction='column' xs={12} lg={6} gap={2}>
      <Typography variant='h4' fontWeight={600} data-testId='unmatched-title'>
        {title}
      </Typography>
      <TableView<OTCOrder>
        uri={trading.getUnmatchedOrders(side)}
        name={tradingQueryKeys.getUnmatchedOrders(side)}
        columns={getColumns(side)}
        hasActions={false}
        themeVariant={side === 'SELL' ? 'error' : 'success'}
      />
    </Grid>
  )
}
