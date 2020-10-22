import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { AssetBalance } from 'v2/types/balance'
import { columns } from 'v2/app/pages/accounts/pages/balances/columns'
import { Paper } from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getIdFromObj } from 'v2/helpers/strings'

export const Balances: React.FC = () => {
  const { user } = useAuth()

  return (
    <Paper variant='elevation'>
      <TableView<AssetBalance>
        uri={`/accounts/balance/${getIdFromObj(user)}`}
        name={`balance-${getIdFromObj(user)}`}
        filter={{ type: 'Currency' }}
        columns={columns}
      />
    </Paper>
  )
}
