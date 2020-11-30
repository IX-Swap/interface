import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/withdrawalAddresses/columns'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const WithdrawalAddresses: React.FC = () => (
  <AuthorizerList
    title='Authorize Withdrawal Addresses'
    uri='/accounts/withdrawal-addresses/list'
    name='authorizerWithdrawalAddressesList'
    columns={columns}
  />
)
