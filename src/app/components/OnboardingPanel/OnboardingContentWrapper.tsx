import { Box } from '@mui/material'
import React from 'react'
import classnames from 'classnames'
import { useStyles } from 'app/components/OnboardingPanel/OnboardingPanel.styles'
import { useOnboardingPanel } from 'app/hooks/onboarding/useOnboardingPanel'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { useLocation } from 'react-router-dom'
import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
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
    isCorporateJourneyCompleted,
    isIndividualJourneyCompleted,
    isIdentitiesLoaded
  } = useOnboardingJourneys()

  const isOnboardingPannelHidden =
    isIndividualJourneyCompleted || isCorporateJourneyCompleted

  const onboardingBasePaths = [
    SecurityRoute.landing,
    AppRoute.educationCentre,
    IdentityRoute.list
  ]

  if (isIndividualJourneyCompleted || isCorporateJourneyCompleted) {
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
