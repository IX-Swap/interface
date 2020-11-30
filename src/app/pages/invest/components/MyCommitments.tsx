import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { Commitment } from 'types/commitment'
import columns from 'app/pages/invest/components/columns'
import { Actions } from 'app/pages/invest/components/Actions'
import { Paper } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { privateClassNames } from 'helpers/classnames'

export const MyCommitments = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='outlined' className={privateClassNames()}>
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
