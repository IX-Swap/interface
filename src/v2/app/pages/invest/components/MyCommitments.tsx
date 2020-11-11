import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { Commitment } from 'v2/types/commitment'
import columns from 'v2/app/pages/invest/components/columns'
import { Actions } from 'v2/app/pages/invest/components/Actions'
import { Paper } from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getIdFromObj } from 'v2/helpers/strings'

export const MyCommitments = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='outlined'>
      <TableView<Commitment>
        uri={`/issuance/commitments/list/${userId}`}
        name={`commitments-${userId}`}
        columns={columns}
        hasActions
        actions={Actions}
      />
    </Paper>
  )
}
