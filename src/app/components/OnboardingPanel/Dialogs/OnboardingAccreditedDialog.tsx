import React from 'react'
import { Typography } from '@material-ui/core'
import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import { useHomeRouter } from 'app/pages/home/router'

export const OnboardingAccreditedDialog = () => {
  const { paths: homePaths } = useHomeRouter()

  return (
    <OnboardingDialog
      initOpened
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
