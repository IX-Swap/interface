import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { columns } from 'app/pages/authorizer/pages/TokenDeployment/columns'
import { authorizerQueryKeys } from 'config/queryKeys'
import React from 'react'

export const TokenDeployments = () => {
  return (
    <AuthorizerList<any>
      title='Token Deployment'
      uri='/issuance/dso/deployments/list'
      name={authorizerQueryKeys.getDSOList}
      columns={columns}
      themeVariant='primary'
      hasStatus={false}
    />
  )
}
