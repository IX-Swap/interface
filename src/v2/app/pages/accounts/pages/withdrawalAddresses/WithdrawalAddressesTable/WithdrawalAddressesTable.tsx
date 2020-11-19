import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { columns } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/columns'
import { Actions } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/Actions'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Paper } from '@material-ui/core'
import { getIdFromObj } from 'v2/helpers/strings'
import { WithdrawalAddress } from 'v2/types/withdrawalAddress'

export const WithdrawalAddressesTable: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='elevation'>
      <TableView<WithdrawalAddress>
        uri={`/accounts/withdrawal-addresses/list/${userId}`}
        name={`withdrawalAddresses-${userId}`}
        columns={columns}
        hasActions
        actions={Actions}
      />
    </Paper>
  )
}
