import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/columns'
import { useDSRouter } from 'app/pages/accounts/pages/digitalSecurities/router'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'

export const RecentDeposits: React.FC = () => {
  const { params } = useDSRouter()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView
      uri={`/accounts/security/deposits/list/${userId}`}
      name={digitalSecuritiesQueryKeys.getDepositByUserId(userId)}
      columns={columns}
      filter={{
        asset: params.balanceId
      }}
    />
  )
}
