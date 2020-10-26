import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/offerings/columns'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const Offerings: React.FC = () => (
  <AuthorizerList
    title='Authorize IssuanceRoot'
    uri='/issuance/dso/list'
    name='authorizerDsoList'
    columns={columns}
  />
)
