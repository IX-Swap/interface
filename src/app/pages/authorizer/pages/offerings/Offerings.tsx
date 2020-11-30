import React from 'react'
import { columns } from 'app/pages/authorizer/pages/offerings/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'

export const Offerings: React.FC = () => (
  <AuthorizerList
    title='Authorize IssuanceRoot'
    uri='/issuance/dso/list'
    name='authorizerDsoList'
    columns={columns}
  />
)
