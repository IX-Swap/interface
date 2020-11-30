import React from 'react'
import { columns } from 'app/pages/authorizer/pages/individualIdentities/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'

export const IndividualIdentities: React.FC = () => (
  <AuthorizerList
    title='Authorize Individual Identity'
    uri='/identity/individuals/list'
    name='authorizerIndividualIdentitiesList'
    columns={columns}
  />
)
