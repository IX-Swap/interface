import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { AppRoute } from 'app/router/config'
import { useUncompletedIdentityDialog } from 'app/components/UncompletedIdentityDialog/hook/useUncompletedIdentityDialog'
import { useIsAccredited } from 'helpers/acl'

export const RedirectToDefaultPage = () => {
  const { pathname } = useLocation()
  const isAccredited = useIsAccredited()
  const { showUncompletedIdentityDialog } =
    useUncompletedIdentityDialog(pathname)

  if (!isAccredited && pathname !== '/app') {
    showUncompletedIdentityDialog()
  }

  return <Redirect to={isAccredited ? AppRoute.home : AppRoute.identity} />
}
