import React, { createElement } from 'react'
import { InternalRouteBase, InternalRouteProps } from 'v2/types/util'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { safeGeneratePath } from 'v2/helpers/router'
import { AppRole, getUserRoles, useIsEnabled2FA } from 'v2/helpers/acl'
import { AppRoute as AppPath } from 'v2/app/router'
import { useCachedUser } from 'v2/hooks/auth/useCachedUser'
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
  const roles = getUserRoles(user?.roles)
  const isAccredited = roles.includes(AppRole.ACCREDITED)
  const isAuthorizer = roles.includes(AppRole.AUTHORIZER)

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
    if (!is2FAEnabled && !path.startsWith(AppPath.security)) {
      return <Redirect to={AppPath.security} />
    }

    if (
      !isAccredited &&
      !(
        path.startsWith(AppPath.identity) ||
        path.startsWith(AppPath.security) ||
        path.startsWith(AppPath.notifications)
      ) &&
      !(isAuthorizer && path.startsWith(AppPath.admin))
    ) {
      return <Redirect to={AppPath.identity} />
    }
  }

  return (
    <>
      <ScrollToTop />
      {createElement(component)}
    </>
  )
}
