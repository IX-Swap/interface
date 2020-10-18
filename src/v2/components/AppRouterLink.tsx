import React from 'react'
import {
  Link as MUILink,
  LinkProps as MUILinkProps,
  Typography
} from '@material-ui/core'
import { Link, LinkProps } from 'react-router-dom'
import { safeGeneratePath } from 'v2/helpers/router'

export const AppRouterLink: React.FC<
  Omit<LinkProps, 'to'> &
    MUILinkProps & { to: string; params?: {}; disabled?: boolean }
> = props => {
  const {
    to,
    params,
    children,
    underline = 'none',
    color = 'inherit',
    disabled = false,
    ...rest
  } = props

  if (disabled) {
    return <Typography>{children}</Typography>
  }

  const RRDLink = (linkProps: any) => (
    <Link
      {...linkProps}
      to={{
        pathname: params === undefined ? to : safeGeneratePath(to, params),
        state: params
      }}
    />
  )

  return (
    <MUILink {...rest} component={RRDLink} color={color} underline={underline}>
      {children}
    </MUILink>
  )
}
