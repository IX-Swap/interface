import { Breadcrumb } from 'components/Breadcrumb'
import { ScrollToTop } from 'components/ScrollToTop'
import { SentryRoute } from 'components/SentryRoute'
import { useCachedUser } from 'hooks/auth/useCachedUser'
import React, { memo } from 'react'
import { RouteProps, Redirect } from 'react-router-dom'

export interface AppRouteProps extends RouteProps {
  path: string
  exact?: boolean
  breadcrumb?: string
}

export const AppRoute = memo((props: AppRouteProps) => {
  const { breadcrumb, path, children, ...rest } = props
  const user = useCachedUser()

  if (user === undefined) {
    if (!path.startsWith('/auth')) {
      return <Redirect to='/auth' />
    }
  }

  return (
    <>
      <ScrollToTop />
      <SentryRoute {...rest} path={path}>
        {breadcrumb !== undefined && (
          <Breadcrumb label={breadcrumb} path={path} />
        )}
        {children}
      </SentryRoute>
    </>
  )
})
