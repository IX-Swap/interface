import React, { useMemo } from 'react'
import { Location } from 'history'
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory,
  generatePath
} from 'react-router-dom'
import { InternalRouteBase, InternalRouteProps } from 'v2/types/util'

interface AppRouter<T> {
  current: InternalRouteBase
  routes: T
  renderRoutes: () => JSX.Element
  query: URLSearchParams
  params: { [key: string]: string }
  push: (route: keyof T, state?: {}) => void
  replace: (route: keyof T, state?: {}) => void
}

const getRouteLabel = (path: string, routes: InternalRouteProps[]): string => {
  const route = routes.find(r => r.path === path)
  return route !== undefined ? route.label : ''
}

interface GetCurrentRouteArgs<T> {
  location: Location
  routes: InternalRouteProps[]
  defaultRoute: string
  routeMap: T
}

const getCurrentRouteFromLocation = <T,>(
  args: GetCurrentRouteArgs<T>
): InternalRouteBase => {
  const { location, routes, routeMap, defaultRoute } = args
  const { pathname, state } = location

  const route = Object.values(routeMap).find(path => {
    if (state !== null && state !== undefined) {
      return pathname === generatePath(path, state)
    }

    return pathname === path
  })

  return {
    label: getRouteLabel(route, routes),
    path: route ?? defaultRoute
  }
}

export function generateAppRouterHook<T> (
  routeMap: T,
  defaultRoute: string,
  routes: InternalRouteProps[]
): () => AppRouter<T> {
  return (): AppRouter<T> => {
    const location = useLocation()
    const history = useHistory()
    const current = useMemo(
      () =>
        getCurrentRouteFromLocation({
          location,
          routes,
          routeMap,
          defaultRoute
        }),
      [location]
    )

    return {
      current,
      query: new URLSearchParams(history.location.search),
      routes: routeMap,
      push: (route, state) => {
        history.push(routeMap[route] as any, state)
      },
      replace: (route, state) => {
        history.replace(routeMap[route] as any, state)
      },
      params: location.state ?? {},
      renderRoutes: () => (
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          <Redirect to={defaultRoute} />
        </Switch>
      )
    }
  }
}
