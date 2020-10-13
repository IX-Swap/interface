import React from 'react'
import { InternalRouteProps } from 'v2/types/util'
import { RouteComponentProps } from 'react-router-dom'
import { useBreadcrumbs } from 'v2/hooks/useBreadcrumbs'
import { safeGeneratePath } from 'v2/helpers/router'

export const AppRoute = (
  props: { route: InternalRouteProps; params: any } & RouteComponentProps
) => {
  const { push } = useBreadcrumbs()
  const { params, route } = props

  push({
    label: route.label,
    path: safeGeneratePath(route.path, params)
  })

  return route.component !== undefined
    ? React.createElement(route.component)
    : null
}
