import { useEffect, useRef, useState } from 'react'
import { InternalRouteBase } from '../types/util'
import { useLocation, generatePath } from 'react-router-dom'
import { accountRoutes } from 'v2/app/pages/accounts/router'
import { banksRoutes } from 'v2/app/pages/accounts/pages/banks/router'
import { dsRoutes } from '../app/pages/accounts/pages/digitalSecurities/router'
import { shouldGeneratePath } from '../helpers/generateAppRouterHook'
import { identityRoutes } from '../app/pages/identity/router'
import { authorizerRoutes } from '../app/pages/authorizer/router'
import { investListRoutes } from 'v2/app/pages/invest/investListRouter'
import { investRoutes } from 'v2/app/pages/invest/router'
import { issuanceRoutes } from 'v2/app/pages/issuance/router'

export const routes = [
  ...accountRoutes,
  ...banksRoutes,
  ...dsRoutes,
  ...identityRoutes,
  ...authorizerRoutes,
  ...investRoutes,
  ...investListRoutes,
  ...issuanceRoutes
]

export const useBreadcrumbs = () => {
  const { pathname } = useLocation()
  const state = window.history.state
  const current = routes.find(({ path }) => {
    return shouldGeneratePath(path, state)
      ? generatePath(path, state) === pathname
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
          setBreadcrumbs(b => [
            ...b,
            { ...current, label: state?.label ?? current.label }
          ])
        } else {
          setBreadcrumbs(b => b.slice(0, indexOfCurrent + 1))
        }
      }
    }
  }, [current, breadcrumbs]) // eslint-disable-line

  return breadcrumbs
}
