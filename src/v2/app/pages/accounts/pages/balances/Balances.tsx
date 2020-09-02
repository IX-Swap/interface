import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { AssetBalance } from 'v2/types/balance'
import { columns } from 'v2/app/pages/accounts/pages/balances/columns'
import { Paper } from '@material-ui/core'
import { useUserStore } from 'v2/auth/context'

export const Balances: React.FC = () => {
  const { user } = useUserStore()

  if (user === undefined) return null

  return (
    <Paper>
      <TableView<AssetBalance>
        uri={`/accounts/balance/${user._id}`}
        name={`balance-${user._id}`}
        columns={columns}
      />
    </Paper>
  )
}
