import React from 'react'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'
import { columns } from 'v2/app/pages/authorizer/pages/banks/columns'

export const Banks: React.FC = () => (
  <AuthorizerList
    title='Authorize Bank Account(s)'
    uri='/accounts/banks/list'
    name='authorizerBanksList'
    columns={columns}
  />
)
