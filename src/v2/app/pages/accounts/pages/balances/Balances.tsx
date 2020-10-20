import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { AssetBalance } from 'v2/types/balance'
import { columns } from 'v2/app/pages/accounts/pages/balances/columns'
import { Paper } from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const Balances: React.FC = () => {
  const { user } = useAuth()

  return (
    <Paper variant='elevation'>
      <TableView<AssetBalance>
        uri={`/accounts/balance/${user?._id ?? ''}`}
        name={`balance-${user?._id ?? ''}`}
        filter={{ type: 'Currency' }}
        columns={columns}
      />
    </Paper>
  )
}
