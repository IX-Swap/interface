import { InternalRouteBase, InternalRouteProps } from 'v2/types/util'
import { generatePath } from 'react-router-dom'
import {
  GetCurrentRouteArgs,
  LocationState
} from 'v2/helpers/generateAppRouterHook'

export const safeGeneratePath = (path: string, params: any) => {
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

export const getRouteLabel = (
  path: string,
  routes: InternalRouteProps[]
): string => {
  const route = routes.find(r => r.path === path)
  return route !== undefined ? route.label : ''
}

export const getHistoryPayload = (route: any, state?: {}) => {
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

export const getCurrentRouteFromLocation = <T>(
  args: GetCurrentRouteArgs<T>
): InternalRouteBase => {
  const { location, routes, defaultRoute } = args
  const { pathname, state } = location

  const route = routes.find(({ path, exact = false }) => {
    if (shouldGeneratePath(path, state)) {
      const generated = generatePath(path, state)
      return exact ? pathname === generated : pathname.startsWith(generated)
    }

    return exact ? pathname === path : pathname.startsWith(path)
  })

  return {
    label: getRouteLabel(route?.path ?? '', routes),
    path: route?.path ?? defaultRoute
  }
}
