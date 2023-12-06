import React from 'react'
// import { TableView } from 'components/TableWithPagination/TableView'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Grid } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { columns } from 'app/pages/accounts/components/TradeHistoryTable/columns'
// import { Filters } from 'app/pages/accounts/components/TradeHistoryTable/Filter'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { exchange as exchangeUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { PairFilter } from 'app/pages/accounts/components/TradeHistoryTable/PairFilter'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'
import { ExportButton } from 'ui/ExportButton/ExportButton'

export interface Deposit {
  date: string
  pair: string
  name: string
  side: 'BUY' | 'SELL'
  type: string
  investedAmount: number
  unitPrice: number
  totalAmount: number
}

export const DepositsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    pair: getFilterValue('pair'),
    orderType: 'PAST'
  }
  const exportButtonId = 'exportTradeHistory'

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
        <TableView<TradeHistory>
          uri={exchangeUrl.userOrders(userId)}
          name={exchangeQueryKeys.userOrders(userId)}
          columns={columns}
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
          exportFileName='Past Orders'
          exportButtonId={exportButtonId}
        />
      </Grid>
    </Grid>
  )
}
