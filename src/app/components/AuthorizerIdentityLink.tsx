import React, { ReactNode } from 'react'
import { AppRouterLink } from 'components/AppRouterLink'
import { useTheme } from '@material-ui/core/styles'

export interface IdentityLinkProps {
  type: 'individual' | 'corporate'
  identityId: string
  children?: ReactNode
}

export const AuthorizerIdentityLink = (props: IdentityLinkProps) => {
  const { identityId, type, children = 'View Profile' } = props
  const theme = useTheme()

  return (
    <AppRouterLink
      target='_blank'
      color='primary'
      underline='always'
      style={{ fontWeight: 700, color: theme.palette.primary.main }}
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
