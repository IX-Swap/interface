import React, { useEffect, useMemo } from 'react'
import { Location } from 'history'
import { Redirect, Switch, useLocation, useHistory } from 'react-router-dom'
import { InternalRouteBase, InternalRouteProps } from 'v2/types/util'
import { getRoutesByType } from '../app/components/LandingPage/utils'
import { LandingPage } from '../app/components/LandingPage/LandingPage'
import { isTestENV } from 'v2/history'
import { useBreadcrumbs } from 'v2/hooks/useBreadcrumbs'
import {
  filterRoutes,
  getCurrentRouteFromLocation,
  getHistoryPayload,
  safeGeneratePath
} from 'v2/helpers/router'
import { SentryRoute } from 'v2/components/SentryRoute'
import { AppRoute } from 'v2/components/AppRoute'
import { useUserRoles } from 'v2/hooks/auth/useUserRoles'

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
    const params = isTestENV ? location.state : window.history.state ?? {}
    const { reset, push } = useBreadcrumbs()
    const roles = useUserRoles()
    const { landing, nested, generic } = getRoutesByType(
      filterRoutes(routes, roles)
    )
    // console.log([...nested, ...generic])

    useEffect(() => {
      reset()
    }, [location.pathname]) // eslint-disable-line

    return {
      current,
      params,
      routes,
      query: new URLSearchParams(history.location.search),
      paths: routeMap,
      push: (route, state) => {
        history.push(getHistoryPayload(routeMap[route], state))
      },
      replace: (route, state) => {
        history.replace(getHistoryPayload(routeMap[route], state))
      },
      renderRoutes: () => (
        <Switch>
          {[...nested, ...generic].map((route, i) => {
            return (
              <SentryRoute
                key={i}
                exact={route.exact}
                path={safeGeneratePath(route.path, params)}
                render={props => (
                  <AppRoute
                    {...props}
                    params={params}
                    route={route}
                    pushCrumb={push}
                  />
                )}
              />
            )
          })}
          {landing !== undefined && (
            <SentryRoute
              key='landing'
              path={landing.path}
              exact={true}
              render={props => (
                <AppRoute
                  {...props}
                  params={params}
                  pushCrumb={push}
                  route={{
                    ...landing,
                    component: () => <LandingPage {...landing} links={nested} />
                  }}
                />
              )}
            />
          )}
          <SentryRoute render={() => <Redirect to={defaultRoute} />} />
        </Switch>
      )
    }
  }
}
