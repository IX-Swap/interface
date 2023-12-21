import React from 'react'
import { columns } from 'app/pages/authorizer/pages/dsWithdrawals/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const DSWithdrawals: React.FC = () => (
  <AuthorizerList
    title='Authorize STO & Stablecoin Withdrawals'
    uri='/accounts/security/withdrawals'
    name={authorizerQueryKeys.getSecurityWithdrawals}
    columns={columns}
    exportFileName='STO & Stablecoin Withdrawals'
    exportButtonId={'exportWithdrawals'}
  />
)
