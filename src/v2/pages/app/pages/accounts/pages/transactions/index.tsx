import React, { useState } from 'react'
import TableView from '../../../../../../components/table-with-pagination'
import storageHelper from '../../../../../../helpers/storageHelper'
import columns from './data'
import { Paper, Grid } from '@material-ui/core'
import { Transaction } from '../../../../../../types/transaction'
import TransactionsFilter from './components/filter'
import { BaseFilter } from '../../../../../../types/util'
import moment from 'moment'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

const useTransactionsLogic = () => {
  const [filter, setFilter] = useState<BaseFilter>({
    status: '',
    asset: '5edf32d9748b763418db6a80',
    from: moment().toISOString(),
    to: moment().toISOString()
  })

  const handleAssetChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setFilter({
      ...filter,
      asset: ev.target.value as string
    })
  }

  const handleDateChange = (
    name: 'to' | 'from',
    date: MaterialUiPickersDate
  ) => {
    const mFilter = { ...filter }
    mFilter[name] = date?.toISOString() ?? ''
    setFilter(mFilter)
  }

  return {
    filter,
    handleAssetChange,
    handleDateChange
  }
}

const Transactions = () => {
  const { filter, handleAssetChange, handleDateChange } = useTransactionsLogic()
  return (
    <Paper>
      <Grid container direction='column'>
        <Grid item xs={12}>
          <TransactionsFilter
            filters={filter}
            assets={[]}
            handleAssetChange={handleAssetChange}
            handleDateChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TableView<Transaction>
            uri={`/accounts/statement/${storageHelper.getUserId()}`}
            name={`transactions-${storageHelper.getUserId()}`}
            columns={columns}
            filter={filter}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Transactions
