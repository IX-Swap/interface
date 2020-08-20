import React from 'react'
import TableView from 'v2/components/TableWithPagination'
import { AssetBalance } from 'v2/types/balance'
import storageHelper from 'v2/helpers/storageHelper'
import columns from 'v2/app/accounts/pages/digital-securities/data'
import { Paper } from '@material-ui/core'

const Balances = () => {
  return (
    <Paper>
      <TableView<AssetBalance>
        uri={`/accounts/balance/${storageHelper.getUserId()}`}
        name={`ds-${storageHelper.getUserId()}`}
        columns={columns}
        filter={{ status: '', type: 'Security' }}
      />
    </Paper>
  )
}

export default Balances
