import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { Grid } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { columns } from 'app/pages/accounts/components/YourOrdersTable/columns'
import { Filters } from 'app/pages/accounts/components/TradeHistoryTable/Filter'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { exchange as exchangeUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { Actions } from 'app/pages/accounts/components/YourOrdersTable/Actions'
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
      <Grid item>
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
