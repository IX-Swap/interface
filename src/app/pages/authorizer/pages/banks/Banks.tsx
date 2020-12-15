import React from 'react'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { columns } from 'app/pages/authorizer/pages/banks/columns'
import { authorizerQueryKeys } from 'config/queryKeys'

export const Banks: React.FC = () => (
  <AuthorizerList
    title='Authorize Bank Account(s)'
    uri='/accounts/banks/list'
    name={authorizerQueryKeys.getBankList}
    columns={columns}
  />
)
