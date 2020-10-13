import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { columns } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/columns'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Card, CardContent } from '@material-ui/core'

export const RecentDeposits: React.FC = () => {
  const { params } = useDSRouter()
  const { user } = useAuth()
  const userId = user !== undefined ? user._id : ''

  return (
    <Card>
      <CardContent>
        <TableView
          uri={`/accounts/security/deposits/list/${userId}`}
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
