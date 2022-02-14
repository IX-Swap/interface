import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { Grid } from '@material-ui/core'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { columns } from 'app/pages/exchange/components/YourOrdersTable/columns'
import { Filters } from 'app/pages/exchange/components/TradeHistoryTable/Filter'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { exchange as exchangeUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { Actions } from 'app/pages/exchange/components/YourOrdersTable/Actions'
import { OrderSide } from 'types/order'

export interface Order {
  _id: string
  type: string
  side: OrderSide
  price: number
  amount: number
  date: string
  pair: string
  total: number
  filled: number
  average?: string | null
  status: string
}

export const YourOrdersTable = () => {
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
        <TableView<Order>
          uri={exchangeUrl.userOrders(userId)}
          name={exchangeQueryKeys.userOrders(userId)}
          columns={columns}
          filter={filter}
          hasActions
          actions={Actions}
          paperProps={{ variant: 'elevation', elevation: 0 }}
        />
      </Grid>
    </Grid>
  )
}
