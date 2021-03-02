import React from 'react'
import { Typography } from '@material-ui/core'
import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import { useSecurityRouter } from 'app/pages/security/router'

export interface Onboarding2FADialog {
  initOpened: boolean
}

export const Onboarding2FADialog = () => {
  const { paths } = useSecurityRouter()

  return (
    <OnboardingDialog
      title='SECURE YOUR ACCOUNT!'
      closeLabel='Skip'
      actionLabel='Enable 2FA'
      action={paths.setup2fa}
      initOpened
    >
      <Typography>
        Increase your account security by enabling two factor authentication
        when signing into platform
      </Typography>
    </OnboardingDialog>
  )
}
