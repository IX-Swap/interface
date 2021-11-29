import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { AppRoute as AppPath } from 'app/router/config'
import { Breadcrumb } from 'components/Breadcrumb'
import { ScrollToTop } from 'components/ScrollToTop'
import { SentryRoute } from 'components/SentryRoute'
import { useIsAccredited, useIsEnabled2FA } from 'helpers/acl'
import { useCachedUser } from 'hooks/auth/useCachedUser'
import React, { memo } from 'react'
import { RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'

export interface AppRouteProps extends RouteProps {
  path: string
  breadcrumb?: string
}

export const AppRoute = memo((props: AppRouteProps) => {
  const { breadcrumb, path, children, ...rest } = props
  const user = useCachedUser()
  const is2FAEnabled = useIsEnabled2FA()
  const isAccredited = useIsAccredited()
  const { showEnable2FADialog, showCreateAccountDialog } = useOnboardingDialog()

  if (user === undefined) {
    if (!path.startsWith('/auth')) {
      return <Redirect to='/auth' />
    }
  } else {
    if (
      !isAccredited &&
      !path.startsWith(AppPath.educationCentre) &&
      !path.startsWith(AppPath.identity) &&
      !path.startsWith(AppPath.security) &&
      !path.startsWith(AppPath.notifications)
    ) {
      showCreateAccountDialog()
      return <Redirect to={AppPath.identity} />
    }

    if (
      !is2FAEnabled &&
      !path.startsWith(AppPath.security) &&
      !path.startsWith(AppPath.educationCentre) &&
      !path.startsWith(AppPath.notifications) &&
      !path.startsWith(AppPath.identity)
    ) {
      showEnable2FADialog()
      return <Redirect to={AppPath.educationCentre} />
    }
  }

  return (
    <>
      <ScrollToTop />
      <SentryRoute {...rest} path={path}>
        {breadcrumb !== undefined && (
          <Breadcrumb label={breadcrumb} path={path} />
        )}
        {children}
      </SentryRoute>
    </>
  )
})
