import React from 'react'
import { Typography } from '@material-ui/core'
import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import { useIsEnabled2FA, useIsAccredited } from 'helpers/acl'
import { useHasIdentity } from 'app/pages/home/hooks/useHasIdentity'
import { useHomeRouter } from 'app/pages/home/router'

export const OnboardingAccreditedDialog = () => {
  const { paths: homePaths } = useHomeRouter()
  const isAccredited = useIsAccredited()
  const isEnabled2FA = useIsEnabled2FA()
  const { hasIdentity, isLoaded } = useHasIdentity()

  if (!isLoaded) {
    return null
  }

  return (
    <OnboardingDialog
      initOpened={isEnabled2FA && hasIdentity && !isAccredited}
      title='Identitfy Verification'
      closeLabel='Close'
      actionLabel='Got It'
      action={homePaths.landing}
      actionArrow={false}
    >
      <Typography>
        In order to access all features of the platform your identity must be
        approved. Once your identity has been approved you will recieve email
        and in-app notifications.
      </Typography>
    </OnboardingDialog>
  )
}
