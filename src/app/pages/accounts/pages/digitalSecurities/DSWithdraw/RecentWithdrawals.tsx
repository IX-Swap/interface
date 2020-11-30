import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/columns'
import { useDSRouter } from 'app/pages/accounts/pages/digitalSecurities/router'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { Card, CardContent } from '@material-ui/core'

export const RecentWithdrawals: React.FC = () => {
  const { params } = useDSRouter()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Card variant='outlined'>
      <CardContent>
        <TableView
          uri={`/accounts/security/withdrawals/list/${userId}`}
          name={`ds-deposits-${userId}`}
          columns={columns}
          filter={{
            asset: params.balanceId
          }}
        />
      </CardContent>
    </Card>
  )
}
