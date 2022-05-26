import { Breadcrumb } from 'components/Breadcrumb'
import { ScrollToTop } from 'components/ScrollToTop'
import { SentryRoute } from 'components/SentryRoute'
import { useCachedUser } from 'hooks/auth/useCachedUser'
import React, { memo } from 'react'
import { RouteProps, Redirect } from 'react-router-dom'
import { useIsAccredited } from 'helpers/acl'
import { AppRoute as AppPath } from 'app/router/config'

export interface AppRouteProps extends RouteProps {
  path: string
  exact?: boolean
  breadcrumb?: string
}

export const AppRoute = memo((props: AppRouteProps) => {
  const { breadcrumb, path, children, ...rest } = props
  const user = useCachedUser()
  const isAccredited = useIsAccredited()

  if (user === undefined) {
    if (!path.startsWith('/auth')) {
      return <Redirect to='/auth' />
    }
  } else {
    if (
      !isAccredited &&
      !path.startsWith(AppPath.educationCentre) &&
      !path.startsWith(AppPath.identity) &&
      !path.startsWith(AppPath.security) &&
      !path.startsWith(AppPath.notifications)
    ) {
      return <Redirect to={AppPath.identity} />
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
