import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/dsWithdrawals/columns'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const DSWithdrawals: React.FC = () => (
  <AuthorizerList
    title='Authorize Digital Security Withdrawal'
    uri='/accounts/security/withdrawals'
    name='authorizerSecurityWithdrawals'
    columns={columns}
  />
)
