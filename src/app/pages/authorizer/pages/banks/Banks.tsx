import React from 'react'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { columns } from 'app/pages/authorizer/pages/banks/columns'
import { authorizerQueryKeys } from 'config/queryKeys'

export const Banks: React.FC = () => (
  <AuthorizerList
    title='Authorize Cash Account(s)'
    uri='/accounts/banks/list'
    name={authorizerQueryKeys.getBankList}
    columns={columns}
  />
)
