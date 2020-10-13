import React, { useEffect, useMemo } from 'react'
import { Location } from 'history'
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory
} from 'react-router-dom'
import { InternalRouteBase, InternalRouteProps } from 'v2/types/util'
import { getRoutesByType } from '../app/components/LandingPage/utils'
import { LandingPage } from '../app/components/LandingPage/LandingPage'
import { isTestENV } from 'v2/history'
import { useBreadcrumbs } from 'v2/hooks/useBreadcrumbs'
import {
  getCurrentRouteFromLocation,
  getHistoryPayload,
  safeGeneratePath
} from 'v2/helpers/router'
import { AppRoute } from 'v2/components/AppRoute'

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

export type LocationState = Record<string, any> | null | undefined

export interface GetCurrentRouteArgs<T> {
  location: Location<Record<string, any>>
  routes: InternalRouteProps[]
  defaultRoute: string
  routeMap: T
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
    const { reset } = useBreadcrumbs()

    useEffect(() => {
      reset()
    }, [location.pathname]) // eslint-disable-line

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
                path={safeGeneratePath(route.path, params)}
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
