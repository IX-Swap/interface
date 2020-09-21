import { InternalRouteBase } from 'v2/types/util'

interface AppRouter<T> {
  current: InternalRouteBase
  routes: T
  renderRoutes: () => JSX.Element
  query: URLSearchParams
  params: { [key: string]: string }
  push: (route: keyof T, state?: {}) => void
  replace: (route: keyof T, state?: {}) => void
}

export const generateRouter = ({
  current = {
    path: '',
    label: ''
  },
  params = {},
  routes = {},
  query = new URLSearchParams(),
  renderRoutes = jest.fn()
}): AppRouter<any> => ({
  current,
  query,
  routes,
  push: jest.fn(),
  replace: jest.fn(),
  params,
  renderRoutes
})
