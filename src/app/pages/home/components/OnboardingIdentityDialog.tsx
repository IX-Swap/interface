import React from 'react'
import { Typography } from '@material-ui/core'
import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { useIsEnabled2FA } from 'helpers/acl'
import { useHasIdentity } from 'app/pages/home/hooks/useHasIdentity'

export const OnboardingIdentityDialog = () => {
  const { paths: indentityPaths } = useIdentitiesRouter()
  const isEnabled2FA = useIsEnabled2FA()
  const { isLoaded, hasIdentity } = useHasIdentity()

  if (!isLoaded) return null

  return (
    <OnboardingDialog
      initOpened={isEnabled2FA && !hasIdentity}
      title='Create an Identity'
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
