import React from 'react'
import { columns } from 'app/pages/authorizer/pages/cashDeposits/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'

export const CashDeposits: React.FC = () => (
  <AuthorizerList
    title='Authorize Cash Deposit(s) '
    uri='/accounts/cash/deposits'
    name='authorizerCashDeposits'
    columns={columns}
  />
)
