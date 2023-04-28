import React from 'react'
import { columns } from 'app/pages/authorizer/pages/offerings/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const Offerings: React.FC = () => (
  <AuthorizerList
    title='Authorize Issuance Offerings'
    uri='/issuance/dso/list'
    name={authorizerQueryKeys.getDSOList}
    columns={columns}
  />
)
