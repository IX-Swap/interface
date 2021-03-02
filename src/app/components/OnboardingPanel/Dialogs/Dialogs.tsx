import { Onboarding2FADialog } from 'app/components/OnboardingPanel/Dialogs/Onboarding2FADialog'
import { useAuth } from 'hooks/auth/useAuth'
import { useIsAccredited, useIsEnabled2FA } from 'helpers/acl'
import React from 'react'
import { OnboardingIdentityDialog } from 'app/components/OnboardingPanel/Dialogs/OnboardingIdentityDialog'
import { OnboardingAccreditedDialog } from 'app/components/OnboardingPanel/Dialogs/OnboardingAccreditedDialog'
import { OnboardingIdentityStatusDialog } from 'app/components/OnboardingPanel/Dialogs/OnboardingIdentityStatusDialog'
import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'

// To do: Make Dialogs behave like Toasts
export const Dialogs = () => {
  const { user } = useAuth()
  const isEnabled2FA = useIsEnabled2FA()
  const { hasIdentity, identityTypeLoaded, identityLoaded } = useGetIdentities()
  const isAccredited = useIsAccredited()

  if (hasIdentity && identityLoaded !== undefined) {
    return (
      <OnboardingIdentityStatusDialog
        status={identityLoaded.status}
        identityType={identityTypeLoaded}
      />
    )
  }

  if (user !== undefined && !user.totpConfirmed) {
    return <Onboarding2FADialog />
  }

  // To do: determine if user tried to go to a blocked page
  if (isEnabled2FA && !hasIdentity) {
    return <OnboardingIdentityDialog />
  }

  if (isEnabled2FA && hasIdentity && !isAccredited) {
    return <OnboardingAccreditedDialog />
  }

  return null
}
