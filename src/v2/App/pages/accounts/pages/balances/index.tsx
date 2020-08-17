import React from 'react'
import TableView from '../../../../../components/TableWithPagination'
import { AssetBalance } from '../../../../../types/balance'
import storageHelper from '../../../../../helpers/storageHelper'
import columns from './data'
import { Paper } from '@material-ui/core'

const Balances = () => {
  return (
    <Paper>
      <TableView<AssetBalance>
        uri={`/accounts/balance/${storageHelper.getUserId()}`}
        name={`balance-${storageHelper.getUserId()}`}
        columns={columns}
        filter={{ status: '' }}
      />
    </Paper>
  )
}

export default Balances
