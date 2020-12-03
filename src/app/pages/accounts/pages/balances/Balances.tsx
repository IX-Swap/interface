import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { AssetBalance } from 'types/balance'
import { columns } from 'app/pages/accounts/pages/balances/columns'
import { Paper } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { balanceQueryKeys } from 'config/queryKeys'

export const Balances: React.FC = () => {
  const { user } = useAuth()

  return (
    <Paper variant='elevation'>
      <TableView<AssetBalance>
        uri={`/accounts/balance/${getIdFromObj(user)}`}
        name={balanceQueryKeys.getByUserId(getIdFromObj(user))}
        filter={{ type: 'Currency' }}
        columns={columns}
      />
    </Paper>
  )
}
