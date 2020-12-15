import React, { ReactNode } from 'react'
import { AppRouterLink } from 'components/AppRouterLink'

export interface IdentityLinkProps {
  type: 'individual' | 'corporate'
  identityId: string
  children?: ReactNode
}

export const AuthorizerIdentityLink = (props: IdentityLinkProps) => {
  const { identityId, type, children = 'View Profile' } = props

  return (
    <AppRouterLink
      target='_blank'
      color='primary'
      underline='always'
      style={{ fontWeight: 700 }}
      to={`/app/authorizer/${type}s/${identityId}/view`}
      params={{
        itemId: identityId,
        category: `${type}s`
      }}
    >
      {children}
    </AppRouterLink>
  )
}
