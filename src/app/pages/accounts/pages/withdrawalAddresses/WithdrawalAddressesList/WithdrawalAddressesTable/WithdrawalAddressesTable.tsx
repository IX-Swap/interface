import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/columns'
import { Actions } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/Actions'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { withdrawalAddressQueryKeys } from 'config/queryKeys'
import { NoWithdrawalAddressData } from './NoWithdrawalAddressData'

export const WithdrawalAddressesTable: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView<WithdrawalAddress>
      uri={`/accounts/withdrawal-addresses/list/${userId}`}
      name={withdrawalAddressQueryKeys.getByUserId(userId)}
      columns={columns}
      hasActions
      actions={Actions}
      noDataComponent={<NoWithdrawalAddressData />}
    />
  )
}
