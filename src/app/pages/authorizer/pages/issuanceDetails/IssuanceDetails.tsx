import React from 'react'

import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { columns } from 'app/pages/authorizer/pages/issuanceDetails/columns'

export const IssuanceDetails: React.FC = () => (
  <AuthorizerList
    title='Authorize Issuance Details'
    uri='/identity/issuance-detail/list'
    name='authorizerIssuanceDetailsList'
    columns={columns}
  />
)
