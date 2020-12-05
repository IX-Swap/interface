import React from 'react'
import { columns } from 'app/pages/authorizer/pages/corporateIdentities/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const CorporateIdentities: React.FC = () => (
  <AuthorizerList
    title='Authorize Corporate Identity'
    uri='/identity/corporates/list'
    name={authorizerQueryKeys.getCorporateIdentities}
    columns={columns}
  />
)
