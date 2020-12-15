import React from 'react'
import { columns } from 'app/pages/authorizer/pages/cashWithdrawals/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const CashWithdrawals: React.FC = () => (
  <AuthorizerList
    title='Authorize Cash Withdraw'
    uri='/accounts/cash/withdrawals'
    name={authorizerQueryKeys.getCashWithdrawals}
    columns={columns}
  />
)
