import React, { ReactNode } from 'react'
import { AppRouterLink } from 'components/AppRouterLink'
import { useTheme } from '@mui/material/styles'

export interface IdentityLinkProps {
  type: 'individual' | 'corporate'
  identityId: string
  userId: string
  children?: ReactNode
  style?: React.CSSProperties
  underline?: 'always' | 'none'
}

export const AuthorizerIdentityLink = (props: IdentityLinkProps) => {
  const {
    identityId,
    type,
    userId,
    style,
    children = 'View Profile',
    underline = 'always'
  } = props
  const theme = useTheme()

  return (
    <AppRouterLink
      target='_blank'
      color='primary'
      underline={underline}
      style={{ fontWeight: 700, color: theme.palette.primary.main, ...style }}
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
