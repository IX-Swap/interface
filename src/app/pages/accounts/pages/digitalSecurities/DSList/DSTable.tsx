import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { DSTableActions } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

export const DSTable: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView
      uri={accountsURL.assets.getAll}
      name={digitalSecuritiesQueryKeys.getByUserId(userId)}
      columns={columns}
      hasActions
      filter={{ type: 'Security' }}
      actions={DSTableActions}
    />
  )
}
