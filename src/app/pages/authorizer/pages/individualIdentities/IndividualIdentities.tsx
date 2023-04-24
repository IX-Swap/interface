import React from 'react'
import { columns } from 'app/pages/authorizer/pages/individualIdentities/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const IndividualIdentities: React.FC = () => (
  <AuthorizerList
    title='Authorize KYC Applications'
    uri='/identity/individuals/list'
    name={authorizerQueryKeys.getIndividualIdentityList}
    columns={columns}
  />
)
