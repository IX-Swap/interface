import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { columns } from 'app/pages/authorizer/pages/DealClosures/columns'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { authorizerQueryKeys } from 'config/queryKeys'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import User from 'types/user'
import { AuthorizableStatus } from 'types/util'

export interface Closure {
  createdAt: string
  dso: DigitalSecurityOffering
  status: AuthorizableStatus
  user: User
  _id: string
  updatedAt: string
  authorizationDocuments: []
  authorizations: []
  identity?: {
    individual: IndividualIdentity
    corporates: CorporateIdentity[]
  }
}

export const DealClosures = () => {
  return (
    <AuthorizerList<Closure>
      title='Authorize Deal Closure'
      uri='/issuance/closure/list'
      name={authorizerQueryKeys.getClosureList}
      columns={columns}
      themeVariant='primary'
    />
  )
}
