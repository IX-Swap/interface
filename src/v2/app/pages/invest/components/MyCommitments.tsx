import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { Commitment } from 'v2/types/commitment'
import storageHelper from 'v2/helpers/storageHelper'
import columns from 'v2/app/pages/invest/components/columns'
import { Actions } from 'v2/app/pages/invest/components/Actions'
import { Paper } from '@material-ui/core'

export const MyCommitments = () => {
  return (
    <Paper variant='outlined'>
      <TableView<Commitment>
        uri={`/issuance/commitments/list/${storageHelper.getUserId()}`}
        name={`commitments-${storageHelper.getUserId()}`}
        columns={columns}
        hasActions
        actions={Actions}
      />
    </Paper>
  )
}
