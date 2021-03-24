import { Breadcrumb } from 'components/Breadcrumb'
import React, { memo } from 'react'
import { Route, RouteProps } from 'react-router'

export interface NewAppRouteProps extends RouteProps {
  breadcrumb?: any
}

export const NewAppRoute = memo((props: NewAppRouteProps) => {
  const { breadcrumb, path, children, ...rest } = props

  return (
    <Route {...rest} path={path}>
      {breadcrumb !== undefined && (
        <Breadcrumb label={breadcrumb} path={path as string} />
      )}
      {children}
    </Route>
  )
})
