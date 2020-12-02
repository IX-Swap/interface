import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/columns'
import { Actions } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/Actions'
import { useAuth } from 'hooks/auth/useAuth'
import { Paper } from '@material-ui/core'
import { getIdFromObj } from 'helpers/strings'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { withdrawalAddress } from 'config/queryKeys'

export const WithdrawalAddressesTable: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='elevation'>
      <TableView<WithdrawalAddress>
        uri={`/accounts/withdrawal-addresses/list/${userId}`}
        name={withdrawalAddress.getByUserId(userId)}
        columns={columns}
        hasActions
        actions={Actions}
      />
    </Paper>
  )
}
