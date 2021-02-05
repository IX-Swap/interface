import React from 'react'
import { Onboarding2FA } from 'app/components/OnboardingPanel/Onboarding2FA'
import { useLocation } from 'react-router-dom'
import { useSecurityRouter } from 'app/pages/security/router'
import { OnboardingHome } from 'app/components/OnboardingPanel/OnboardingHome'
import { Box } from '@material-ui/core'
import { useStyles } from 'app/components/OnboardingPanel/OnboardingPanel.styles'

export const TopPanel = () => {
  const {
    paths: { setup2fa }
  } = useSecurityRouter()
  const { pathname } = useLocation()
  const { topPanel } = useStyles()

  const showTopPanel = () => {
    switch (pathname) {
      case setup2fa:
        return <Onboarding2FA />

      default:
        return <OnboardingHome />
    }
  }

  return <Box className={topPanel}>{showTopPanel()}</Box>
}
