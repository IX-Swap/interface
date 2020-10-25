import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/cashWithdrawals/columns'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const CashWithdrawals: React.FC = () => (
  <AuthorizerList
    title='Authorize Cash Withdraw'
    uri='/accounts/cash/withdrawals'
    name='authorizerCashWithdrawals'
    columns={columns}
  />
)
