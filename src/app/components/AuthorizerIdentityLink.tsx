import React, { ReactNode } from 'react'
import { AppRouterLink } from 'components/AppRouterLink'
import { useTheme } from '@mui/material/styles'

export interface IdentityLinkProps {
  type: 'individual' | 'corporate'
  identityId: string
  userId: string
  children?: ReactNode
}

export const AuthorizerIdentityLink = (props: IdentityLinkProps) => {
  const { identityId, type, userId, children = 'View Profile' } = props
  const theme = useTheme()

  return (
    <AppRouterLink
      target='_blank'
      color='primary'
      underline='always'
      style={{ fontWeight: 700, color: theme.palette.primary.main }}
      to={`/app/authorizer/${type}s/${userId}/${identityId}/view`}
      params={{
        itemId: identityId,
        category: `${type}s`
      }}
    >
      {children}
    </AppRouterLink>
  )
}
