import { Box } from '@material-ui/core'
import React from 'react'
import classnames from 'classnames'
import { useStyles } from 'app/components/OnboardingPanel/OnboardingPanel.styles'
import { useOnboardingPanel } from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { useSecurityRouter } from 'app/pages/security/router'
import { useLocation } from 'react-router-dom'
import { useHomeRouter } from 'app/pages/home/router'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'

export interface OnboardingContentWrapperProps {
  children: React.ReactNode
}

export const OnboardingContentWrapper = ({
  children
}: OnboardingContentWrapperProps) => {
  const { content, contentShift } = useStyles()
  const { open } = useOnboardingPanel()
  const { paths: securityPaths } = useSecurityRouter()
  const { paths: homePaths } = useHomeRouter()
  const { paths: identityPaths } = useIdentitiesRouter()
  const { pathname } = useLocation()
  const {
    isIssuerJourneyCompleted,
    isInvestorJourneyCompleted,
    isIndividualJourneyCompleted,
    isInvestorJourneyStarted,
    isIssuerJourneyStarted,
    isIdentitiesLoaded
  } = useOnboardingJourneys()

  const onboardingBasePaths = [
    securityPaths.landing,
    homePaths.landing,
    identityPaths.list
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
