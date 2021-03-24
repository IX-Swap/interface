import { Box } from '@material-ui/core'
import React from 'react'
import classnames from 'classnames'
import { useStyles } from 'app/components/OnboardingPanel/OnboardingPanel.styles'
import { useOnboardingPanel } from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { useLocation } from 'react-router-dom'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { IdentityRoute } from 'app/pages/_identity/router/config'
import { SecurityRoute } from 'app/pages/security/router/config'
import { HomeRoute } from 'app/pages/home/router/config'

export interface OnboardingContentWrapperProps {
  children: React.ReactNode
}

export const OnboardingContentWrapper = ({
  children
}: OnboardingContentWrapperProps) => {
  const { content, contentShift } = useStyles()
  const { open } = useOnboardingPanel()
  const { pathname } = useLocation()
  const {
    isIssuerJourneyCompleted,
    isInvestorJourneyCompleted,
    isIndividualJourneyCompleted
  } = useOnboardingJourneys()

  const onboardingBasePaths = [
    SecurityRoute.landing,
    HomeRoute.landing,
    IdentityRoute.list
  ]

  // TODO: refactor this (possibly after routing refactoring task will be done)
  if (
    (isIssuerJourneyCompleted && pathname.endsWith('issuer')) ||
    (isInvestorJourneyCompleted &&
      pathname.startsWith('/app/identity/corporates')) ||
    (isIndividualJourneyCompleted &&
      pathname.startsWith('/app/identity/individuals')) ||
    (isIndividualJourneyCompleted &&
      isInvestorJourneyCompleted &&
      isIssuerJourneyCompleted &&
      pathname.startsWith('/app/identity'))
  ) {
    return <>{children}</>
  }

  const pathnameBase = pathname.split('/').slice(0, 3).join('/')

  return onboardingBasePaths.includes(pathnameBase) ? (
    <Box display='flex' width='100%'>
      <Box className={classnames(content, { [contentShift]: open })}>
        {children}
      </Box>
      <OnboardingPanel />
    </Box>
  ) : (
    <>{children}</>
  )
}
