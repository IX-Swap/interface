import React from 'react'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { columns } from 'app/pages/authorizer/pages/VirtualAccounts/columns'
import { authorizerQueryKeys } from 'config/queryKeys'
import { virtualAccounts } from 'config/apiURL'

export const VirtualAccounts: React.FC = () => (
  <AuthorizerList
    title='Authorize Virtual Account(s)'
    uri={virtualAccounts.getAll}
    name={authorizerQueryKeys.getVirtualAccounts}
    columns={columns}
  />
)
