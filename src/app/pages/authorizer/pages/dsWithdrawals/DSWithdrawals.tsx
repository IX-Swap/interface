import React from 'react'
import { columns } from 'app/pages/authorizer/pages/dsWithdrawals/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const DSWithdrawals: React.FC = () => (
  <AuthorizerList
    title='Authorize Security Token Withdrawals'
    uri='/accounts/security/withdrawals'
    name={authorizerQueryKeys.getSecurityWithdrawals}
    columns={columns}
  />
)
