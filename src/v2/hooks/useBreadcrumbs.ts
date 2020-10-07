import { useEffect, useRef, useState } from 'react'
import { InternalRouteBase } from '../types/util'
import { useLocation, generatePath } from 'react-router-dom'
import { accountRoutes } from 'v2/app/pages/accounts/router'
import { banksRoutes } from 'v2/app/pages/accounts/pages/banks/router'
import { dsRoutes } from '../app/pages/accounts/pages/digitalSecurities/router'
import { shouldGeneratePath } from '../helpers/generateAppRouterHook'
import { identityRoutes } from '../app/pages/identity/router'

const routes = [
  ...accountRoutes,
  ...banksRoutes,
  ...dsRoutes,
  ...identityRoutes
]

export const useBreadcrumbs = () => {
  const { pathname, state } = useLocation()
  const current = routes.find(({ path }) => {
    return shouldGeneratePath(path, state as any)
      ? generatePath(path, state as any) === pathname
      : path === pathname
  })
  const initialState = current !== undefined ? [current] : []
  const [breadcrumbs, setBreadcrumbs] = useState<InternalRouteBase[]>(
    initialState
  )
  const previous = useRef<InternalRouteBase>()

  useEffect(() => {
    if (current === undefined) {
      return
    }

    if (previous.current === undefined) {
      previous.current = current
    } else {
      if (previous.current.path !== current.path) {
        previous.current = current

        const indexOfCurrent = breadcrumbs.findIndex(
          ({ path }) => current.path === path
        )
        const exists = indexOfCurrent !== -1

        if (!exists) {
          setBreadcrumbs(b => [...b, current])
        } else {
          setBreadcrumbs(b => b.slice(0, indexOfCurrent + 1))
        }
      }
    }
  }, [current, breadcrumbs])

  return breadcrumbs
}
