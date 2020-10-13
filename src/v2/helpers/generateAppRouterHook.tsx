import React, { useEffect, useMemo } from 'react'
import { Location } from 'history'
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory,
  generatePath,
  Link,
  RouteComponentProps
} from 'react-router-dom'
import { InternalRouteBase, InternalRouteProps } from 'v2/types/util'
import { getRoutesByType } from '../app/components/LandingPage/utils'
import { LandingPage } from '../app/components/LandingPage/LandingPage'
import { isTestENV } from 'v2/history'
import { useNewBreadcrumbs } from 'v2/hooks/useNewBreadcrumbs'
import { routes } from 'v2/hooks/useBreadcrumbs'
export interface AppRouter<T> {
  current: InternalRouteBase
  paths: T
  renderRoutes: () => JSX.Element
  query: URLSearchParams
  params: { [key: string]: string }
  push: (route: keyof T, state?: {}) => void
  replace: (route: keyof T, state?: {}) => void
  routes: InternalRouteProps[]
}

type LocationState = Record<string, any> | null | undefined

const getRouteLabel = (path: string, routes: InternalRouteProps[]): string => {
  const route = routes.find(r => r.path === path)
  return route !== undefined ? route.label : ''
}

interface GetCurrentRouteArgs<T> {
  location: Location<Record<string, any>>
  routes: InternalRouteProps[]
  defaultRoute: string
  routeMap: T
}

const genPath = (path: string, params: any) => {
  if (params === undefined || params === null) {
    return path
  }

  return Object.keys(params).length !== 0
    ? Object.keys(params).reduce(
        (path, param) => path.replace(`:${param}`, params[param]),
        path
      )
    : path
}

const getHistoryPayload = (route: any, state?: {}) => {
  let pathname = route as string

  if (state !== undefined) {
    pathname = generatePath(route, state)
  }

  return {
    pathname,
    state
  }
}

export const shouldGeneratePath = (
  path: string,
  state: LocationState
): state is Record<string, string> => {
  if (state === undefined || state === null) {
    return false
  }

  const params = path
    .split('/')
    .filter(s => s.startsWith(':'))
    .map(s => s.replace(/:/, ''))

  return params.every(p => state[p] !== undefined)
}

export const getCurrentRouteFromLocation = <T,>(
  args: GetCurrentRouteArgs<T>
): InternalRouteBase => {
  const { location, routes, routeMap, defaultRoute } = args
  const { pathname, state } = location

  const route = Object.values(routeMap).find(path => {
    if (shouldGeneratePath(path, state)) {
      return pathname === generatePath(path, state)
    }

    return pathname === path
  })

  return {
    label: getRouteLabel(route, routes),
    path: route ?? defaultRoute
  }
}

const AppRoute = (
  props: { route: InternalRouteProps; params: any } & RouteComponentProps
) => {
  const { push } = useNewBreadcrumbs()
  const { params, route } = props

  push({
    label: route.label,
    path: genPath(route.path, params)
  })

  return route.component !== undefined
    ? React.createElement(route.component)
    : null
}

export function generateAppRouterHook<T>(
  routeMap: T,
  defaultRoute: string,
  routes: InternalRouteProps[]
): () => AppRouter<T> {
  return (): AppRouter<T> => {
    const location = useLocation<Record<string, any>>()
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
    const { landing, nested, generic } = getRoutesByType(routes)
    const params = isTestENV ? location.state : window.history.state ?? {}
    const { reset } = useNewBreadcrumbs()

    useEffect(() => {
      reset()
    }, [current.path])

    return {
      current,
      routes,
      query: new URLSearchParams(history.location.search),
      paths: routeMap,
      push: (route, state) => {
        history.push(getHistoryPayload(routeMap[route], state))
      },
      replace: (route, state) => {
        history.replace(getHistoryPayload(routeMap[route], state))
      },
      params,
      renderRoutes: () => (
        <Switch>
          {[...nested, ...generic].map((route, i) => {
            return (
              <Route
                key={i}
                exact={route.exact}
                path={genPath(route.path, params)}
                render={props => (
                  <AppRoute {...props} params={params} route={route} />
                )}
              />
            )
          })}
          {landing !== undefined && (
            <Route
              key='landing'
              path={landing.path}
              exact={true}
              component={() => <LandingPage {...landing} links={nested} />}
            />
          )}
          <Redirect to={defaultRoute} />
        </Switch>
      )
    }
  }
}
