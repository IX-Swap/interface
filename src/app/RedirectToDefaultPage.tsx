import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { AppRoute } from 'app/router/config'
import { useUncompletedIdentityDialog } from 'app/components/UncompletedIdentityDialog/hook/useUncompletedIdentityDialog'
import {
  useIsAccredited,
  useIsRetail,
  useIsExpert,
  useIsInstitutional
} from 'helpers/acl'

export const RedirectToDefaultPage = () => {
  const { pathname } = useLocation()
  const isAccredited = useIsAccredited()
  const isRetail = useIsRetail()
  const isExpert = useIsExpert()
  const isInstitutional = useIsInstitutional()

  const isInvestor = isAccredited || isRetail || isExpert || isInstitutional
  const { showUncompletedIdentityDialog } =
    useUncompletedIdentityDialog(pathname)

  if (!isInvestor && pathname !== '/app') {
    showUncompletedIdentityDialog()
  }

  //   return <Redirect to={isInvestor ? AppRoute.dashboard : AppRoute.identity} />
  return <Redirect to={AppRoute.dashboard} />
}
