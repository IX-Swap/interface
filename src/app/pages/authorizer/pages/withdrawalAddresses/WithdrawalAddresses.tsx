import React from 'react'
import { columns } from 'app/pages/authorizer/pages/withdrawalAddresses/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'

export const WithdrawalAddresses: React.FC = () => (
  <AuthorizerList
    title='Authorize Blockchain Addresses'
    uri='/accounts/withdrawal-addresses/list'
    name='authorizerWithdrawalAddressesList'
    columns={columns}
  />
)
