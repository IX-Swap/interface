import React from 'react'
import { columns } from 'app/pages/authorizer/pages/cashDeposits/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const CashDeposits: React.FC = () => (
  <AuthorizerList
    title='Authorize Cash Deposit(s) '
    uri='/accounts/cash/deposits'
    name={authorizerQueryKeys.getCashDeposits}
    columns={columns}
  />
)
