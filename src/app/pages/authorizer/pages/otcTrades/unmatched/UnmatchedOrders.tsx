import { Grid, Typography } from '@mui/material'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import React from 'react'
import { OrderType, OTCOrder } from 'types/otcOrder'
import { getColumns } from './columns'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export interface UnmatchedOrdersProps {
  side: OrderType
  title: string
}
export const UnmatchedOrders = ({ side, title }: UnmatchedOrdersProps) => {
  const { getFilterValue } = useQueryFilter()
  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate')
  }
  return (
    <Grid item container direction='column' xs={12}>
      <Typography variant='h4' fontWeight={600} data-testId='unmatched-title'>
        {title}
      </Typography>
      <TableView<OTCOrder>
        uri={trading.getUnmatchedOrders(side)}
        name={tradingQueryKeys.getUnmatchedOrders(side)}
        columns={getColumns(side)}
        hasActions={false}
        filter={filter}
        // themeVariant={side === 'SELL' ? 'error' : 'success'}
      />
    </Grid>
  )
}
