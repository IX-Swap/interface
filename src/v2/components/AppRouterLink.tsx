import React from 'react'
import { Link as MUILink, LinkProps as MUILinkProps } from '@material-ui/core'
import { generatePath, Link, LinkProps } from 'react-router-dom'

export const AppRouterLink: React.FC<
  Omit<LinkProps, 'to'> & MUILinkProps & { to: string; params?: {} }
> = props => {
  const {
    to,
    params,
    children,
    underline = 'none',
    color = 'inherit',
    ...rest
  } = props
  const RRDLink = (linkProps: any) => (
    <Link
      {...linkProps}
      to={{
        pathname: params === undefined ? to : generatePath(to, params),
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
