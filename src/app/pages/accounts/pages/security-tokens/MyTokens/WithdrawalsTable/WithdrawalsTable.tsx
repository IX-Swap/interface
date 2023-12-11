import React from 'react'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Grid } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { columns } from './columns'
import { accountsURL } from 'config/apiURL'
import { securityToken as stoQueryKeys } from 'config/queryKeys'
import { WithdrawalStatusFilter } from './WithdrawalStatusFilter'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'
import { ExportButton } from 'ui/ExportButton/ExportButton'
import { useExportWithdrawals } from 'hooks/securityToken/useExportWithdrawals'
import { useAppState } from 'app/hooks/useAppState'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export interface Withdrawal {
  date: string
  pair: string
  name: string
  side: 'BUY' | 'SELL'
  type: string
  investedAmount: number
  unitPrice: number
  totalAmount: number
}

export const WithdrawalsTable = () => {
  const { tableHasData } = useAppState()
  const queryKey = stoQueryKeys.getWithdrawals
  const withdrawalsTable = tableHasData.find(
    table => table.tableName === queryKey
  )
  const hasData =
    withdrawalsTable !== undefined ? withdrawalsTable.status : false

  const { getFilterValue } = useQueryFilter()

  const search = getFilterValue('searchTransactions')
  const startDate = getFilterValue('fromDate')
  const endDate = getFilterValue('toDate')
  const status = getFilterValue('status')

  const filter = {
    search,
    from: startDate,
    to: endDate,
    status
  }

  const { refetch } = useExportWithdrawals(
    0,
    500,
    startDate,
    endDate,
    search,
    status
  )

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <BaseFilters
          searchFilterValue='searchTransactions'
          fullWidthSearch
          showDateLabels
        >
          <Grid item xs>
            <InputLabel>Status</InputLabel>
            <WithdrawalStatusFilter />
          </Grid>
          {hasData && (
            <Grid item xs={2} display={'flex'} alignItems={'end'}>
              <ExportButton
                fullWidth
                onClick={async () => {
                  await refetch()
                }}
              />
            </Grid>
          )}
        </BaseFilters>
      </Grid>
      <Grid item>
        <TableView<Withdrawal>
          uri={accountsURL.securityToken.getWithdrawals}
          name={queryKey}
          columns={columns}
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
        />
      </Grid>
    </Grid>
  )
}
