import React from 'react'
import { Typography } from '@material-ui/core'
import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { useIsEnabled2FA, useIsAccredited } from 'helpers/acl'

export const OnboardingIdentityDialog = () => {
  const { paths: indentityPaths } = useIdentitiesRouter()
  const isAccredited = useIsAccredited()
  const isEnabled2FA = useIsEnabled2FA()

  return (
    <OnboardingDialog
      initOpened={isEnabled2FA && !isAccredited}
      title='Create Your Account'
      closeLabel='Close'
      actionLabel='Create Account'
      action={indentityPaths.createIndividual}
    >
      <Typography>
        Please create your identity first before you can manage your Accounts.
      </Typography>
    </OnboardingDialog>
  )
}
