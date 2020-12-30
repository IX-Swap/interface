import React from 'react'
import {
  LinkProps as MUILinkProps,
  Typography,
  Link as MUILink
} from '@material-ui/core'
import { Link, LinkProps } from 'react-router-dom'
import { safeGeneratePath } from 'helpers/router'

export interface AppRouterLinkProps {
  to: string
  params?: {}
  disabled?: boolean
  replace?: boolean
}

export const AppRouterLink: React.FC<
  Omit<LinkProps, 'to'> & MUILinkProps & AppRouterLinkProps
> = props => {
  const {
    to,
    params,
    children,
    disabled = false,
    underline = 'none',
    ...rest
  } = props

  if (disabled) {
    return <Typography>{children}</Typography>
  }

  return (
    <MUILink
      {...rest}
      underline={underline}
      component={Link}
      to={{
        pathname: params === undefined ? to : safeGeneratePath(to, params),
        state: params
      }}
    >
      {children}
    </MUILink>
  )
}

export const AppRouterLinkComponent = (props: AppRouterLinkProps) => {
  return <AppRouterLink {...props} />
}
