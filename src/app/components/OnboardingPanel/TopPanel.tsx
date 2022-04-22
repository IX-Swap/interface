import React from 'react'
import { Onboarding2FA } from 'app/components/OnboardingPanel/Onboarding2FA'
import { useLocation } from 'react-router-dom'
import { OnboardingHome } from 'app/components/OnboardingPanel/OnboardingHome'
import { Box } from '@mui/material'
import { useStyles } from 'app/components/OnboardingPanel/OnboardingPanel.styles'
import { SecurityRoute } from 'app/pages/security/router/config'

export const TopPanel = () => {
  const { pathname } = useLocation()
  const { topPanel } = useStyles()

  const showTopPanel = () => {
    switch (pathname) {
      case SecurityRoute.setup2fa:
        return <Onboarding2FA />

      default:
        return <OnboardingHome />
    }
  }

  return <Box className={topPanel}>{showTopPanel()}</Box>
}
