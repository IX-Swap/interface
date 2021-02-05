import React, { createElement } from 'react'
import { InternalRouteBase, InternalRouteProps } from 'types/util'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { safeGeneratePath } from 'helpers/router'
import { useIsEnabled2FA, useIsAccredited } from 'helpers/acl'
import { AppRoute as AppPath } from 'app/router'
import { useCachedUser } from 'hooks/auth/useCachedUser'
import { ScrollToTop } from './ScrollToTop'

export interface AppRouteProps extends RouteComponentProps {
  route: InternalRouteProps
  params: any
  pushCrumb: (crumb: InternalRouteBase) => void
}

export const AppRoute = (props: AppRouteProps) => {
  const { params, route, pushCrumb } = props
  const { path, component } = route
  const user = useCachedUser()
  const is2FAEnabled = useIsEnabled2FA()
  const isAccredited = useIsAccredited()

  pushCrumb({
    label: route.label,
    path: safeGeneratePath(route.path, params)
  })

  if (component === undefined) {
    return null
  }

  if (user === undefined) {
    if (!path.startsWith('/auth')) {
      return <Redirect to='/auth' />
    }
  } else {
    if (
      !is2FAEnabled &&
      !path.startsWith(AppPath.security) &&
      !path.startsWith(AppPath.home) &&
      !path.startsWith(AppPath.notifications) &&
      !path.startsWith(AppPath.identity)
    ) {
      return <Redirect to={AppPath.home} />
    }

    if (
      !isAccredited &&
      !path.startsWith(AppPath.home) &&
      !path.startsWith(AppPath.identity) &&
      !path.startsWith(AppPath.security) &&
      !path.startsWith(AppPath.notifications)
    ) {
      return <Redirect to={AppPath.home} />
    }
  }

  return (
    <>
      <ScrollToTop />
      {createElement(component)}
    </>
  )
}
