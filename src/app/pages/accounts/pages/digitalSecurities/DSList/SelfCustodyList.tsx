import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { accountsURL } from 'config/apiURL'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import React from 'react'

export const SelfCustodyList = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView
      uri={accountsURL.balance.getAll(userId)}
      name={digitalSecuritiesQueryKeys.selfCustody(userId)}
      columns={columns}
      paperProps={{
        style: {
          borderTop: 'none'
        }
      }}
    />
  )
}
