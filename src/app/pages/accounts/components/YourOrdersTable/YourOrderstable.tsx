import React from 'react'
// import { TableView } from 'components/TableWithPagination/TableView'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Grid } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { columns } from 'app/pages/accounts/components/YourOrdersTable/columns'
// import { Filters } from 'app/pages/accounts/components/TradeHistoryTable/Filter'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { exchange as exchangeUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { Actions } from 'app/pages/accounts/components/YourOrdersTable/Actions'
import { OrderSide } from 'types/order'
import { PairFilter } from 'app/pages/accounts/components/TradeHistoryTable/PairFilter'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'
import { ExportButton } from 'ui/ExportButton/ExportButton'

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

  const exportButtonId = 'exportOrders'

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <BaseFilters>
          <Grid item xs>
            <PairFilter />
          </Grid>
          <Grid item xs>
            <ExportButton
              fullWidth
              onClick={() => {
                document.getElementById(exportButtonId)?.click()
              }}
            />
          </Grid>
        </BaseFilters>
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
          exportFileName='Open Orders'
          exportButtonId={exportButtonId}
        />
      </Grid>
    </Grid>
  )
}
