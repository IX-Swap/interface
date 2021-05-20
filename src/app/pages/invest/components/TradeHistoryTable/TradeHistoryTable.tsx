import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { Grid } from '@material-ui/core'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { columns } from 'app/pages/invest/components/TradeHistoryTable/columns'
import { Filters } from 'app/pages/invest/components/TradeHistoryTable/Filter'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { exchange as exchangeUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'

export interface TradeHistory {
  date: string
  pair: string
  name: string
  side: 'BUY' | 'SELL'
  type: string
  investedAmount: number
  unitPrice: number
  totalAmount: number
}

export const TradeHistoryTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    pair: getFilterValue('pair')
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item style={{ maxHeight: 70 }}>
        <Filters />
      </Grid>
      <Grid item>
        <TableView<TradeHistory>
          uri={exchangeUrl.userTrades(userId)}
          name={exchangeQueryKeys.userTrades(userId)}
          columns={columns}
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
        />
      </Grid>
    </Grid>
  )
}
