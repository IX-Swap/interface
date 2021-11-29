import { Box } from '@material-ui/core'
import React from 'react'
import classnames from 'classnames'
import { useStyles } from 'app/components/OnboardingPanel/OnboardingPanel.styles'
import { useOnboardingPanel } from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { useLocation } from 'react-router-dom'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { SecurityRoute } from 'app/pages/security/router/config'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import { AppRoute } from 'app/router/config'

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
    isIndividualJourneyCompleted,
    isInvestorJourneyStarted,
    isIssuerJourneyStarted,
    isIdentitiesLoaded
  } = useOnboardingJourneys()

  const isOnboardingPannelHidden =
    isIndividualJourneyCompleted ||
    isInvestorJourneyCompleted ||
    isIssuerJourneyCompleted

  const onboardingBasePaths = [
    SecurityRoute.landing,
    AppRoute.educationCentre,
    IdentityRoute.list
  ]

  if (
    isIndividualJourneyCompleted ||
    (isInvestorJourneyCompleted && !isIssuerJourneyStarted) ||
    (isIssuerJourneyCompleted && !isInvestorJourneyStarted)
  ) {
    return <>{children}</>
  }
  const pathnameBase = pathname.split('/').slice(0, 3).join('/')

  if (!isIdentitiesLoaded) {
    return <LoadingFullScreen />
  }

  return onboardingBasePaths.includes(pathnameBase) &&
    !isOnboardingPannelHidden ? (
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
