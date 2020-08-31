import React from 'react'
import { generatePath, Link, LinkProps } from 'react-router-dom'

export const AppRouterLink: React.FC<
  Omit<LinkProps, 'to'> & { to: string; params?: {} }
> = props => {
  const { to, params, children, ...rest } = props

  return (
    <Link
      {...rest}
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={{
        pathname: params === undefined ? to : generatePath(to, params),
        state: params
      }}
    >
      {children}
    </Link>
  )
}
