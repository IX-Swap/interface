import { columns } from 'app/pages/accounts/pages/cash/components/columns'
import { balanceQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import React from 'react'
import { ConvertedAssetBalance } from 'types/balance'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'

export const CashTable: React.FC = () => {
  const { user } = useAuth()

  return (
    <TableView<ConvertedAssetBalance>
      uri={`/virtual-accounts/${getIdFromObj(user)}`}
      name={balanceQueryKeys.getByUserId(getIdFromObj(user))}
      filter={{ type: 'Currency' }}
      columns={columns}
      method='GET'
    />
  )
}
