import React from 'react'
import {
  columns,
  compactColumns
} from 'app/pages/authorizer/pages/individualIdentities/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const IndividualIdentities: React.FC = () => (
  <AuthorizerList
    title='Authorize Individual KYC Applications'
    uri='/identity/individuals/list'
    name={authorizerQueryKeys.getIndividualIdentityList}
    columns={columns}
    compactColumns={compactColumns}
    hasStatusWithActions={false}
  />
)
