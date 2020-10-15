import React, { ReactNode } from 'react'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { AuthorizerRoute } from 'v2/app/pages/authorizer/router'

export interface IdentityLinkProps {
  type: 'individual' | 'corporate'
  identityId: string
  children?: ReactNode
}

export const AuthorizerIdentityLink = (props: IdentityLinkProps) => {
  const { identityId, type, children = 'View Profile' } = props

  return (
    <AppRouterLink
      to={AuthorizerRoute.viewItem}
      params={{
        itemId: identityId,
        category: `${type}s`
      }}
      color='primary'
      underline='always'
      style={{ fontWeight: 700 }}
    >
      {children}
    </AppRouterLink>
  )
}
