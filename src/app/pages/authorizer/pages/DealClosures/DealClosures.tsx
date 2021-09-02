import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { columns } from 'app/pages/authorizer/pages/DealClosures/columns'
import { authorizerQueryKeys } from 'config/queryKeys'
import React from 'react'

export const DealClosures = () => {
  return (
    <AuthorizerList
      title='Authorize Deal Closure'
      uri='/issuance/dso/list'
      name={authorizerQueryKeys.getDSOList}
      columns={columns}
      themeVariant='primary'
    />
  )
}
