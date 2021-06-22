import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { Card, CardContent } from '@material-ui/core'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'

export const RecentWithdrawals: React.FC = () => {
  const params = useParams<{ balanceId: string }>()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Card variant='outlined'>
      <CardContent>
        <TableView
          uri={`/accounts/security/withdrawals/list/${userId}`}
          name={digitalSecuritiesQueryKeys.getWithdrawalsByUserId(userId)}
          columns={columns}
          filter={{
            asset: params.balanceId
          }}
        />
      </CardContent>
    </Card>
  )
}
