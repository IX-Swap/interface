import React from 'react'
import { useParams } from 'react-router-dom'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/security-tokens/Deposit/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'

export const RecentDeposits: React.FC = () => {
  const { user } = useAuth()
  const params = useParams<{ balanceId: string }>()
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
