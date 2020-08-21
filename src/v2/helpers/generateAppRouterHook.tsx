import React from 'react'
import { Location } from 'history'
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory
} from 'react-router-dom'
import { InternalRouteProps } from 'v2/types/util'

interface AppRouter<T> {
  current: string
  routes: T
  renderRoutes: () => JSX.Element
  push: (route: keyof T) => void
  query: URLSearchParams
}

export function generateAppRouterHook<T> (
  routeMap: T,
  defaultRoute: string,
  routes: InternalRouteProps[]
): () => AppRouter<T> {
  const getCurrentRouteFromLocation = ({ pathname }: Location): string => {
    const route = Object.values(routeMap).find(path => {
      return pathname.includes(path) && path
    })

    return route ?? defaultRoute
  }

  return (): AppRouter<T> => {
    const location = useLocation()
    const history = useHistory()

    return {
      query: new URLSearchParams(history.location.search),
      routes: routeMap,
      current: getCurrentRouteFromLocation(location),
      push: route => {
        history.push(routeMap[route])
      },
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
