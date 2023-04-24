import React from 'react'
import {
  columns,
  compactColumns
} from 'app/pages/authorizer/pages/corporateIdentities/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const CorporateIdentities: React.FC = () => (
  <AuthorizerList
    title='Authorize Corporate KYC Applications'
    uri='/identity/corporates/list'
    name={authorizerQueryKeys.getCorporateIdentities}
    columns={columns}
    compactColumns={compactColumns}
  />
)
