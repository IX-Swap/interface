import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import {
  defaultOnboardingSteps,
  getIdentityOnboardingSteps
} from 'app/components/OnboardingPanel/hooks/utils'
import { AuthorizableStatus } from 'types/util'
import { IdentityType } from 'app/pages/identity/utils/shared'

export const useOnboardingSteps = (
  identityType?: IdentityType,
  asIssuer = false
) => {
  const {
    hasIdentity,
    identityLoaded,
    identityTypeLoaded,
    individualIdentity,
    corporateIdentities
  } = useGetIdentities(asIssuer ? 'issuer' : 'investor')

  const getIdentityActiveStep = (status?: AuthorizableStatus) => {
    let indetityActiveStep = 2
    if (status === 'Submitted') {
      indetityActiveStep = 3
    }
    if ((status as AuthorizableStatus) === 'Approved') {
      indetityActiveStep = 4
    }
    return indetityActiveStep
  }

  const getActiveStep = (status?: AuthorizableStatus) => {
    return getIdentityActiveStep(status)
  }

  if (identityType === undefined && hasIdentity) {
    return {
      steps: getIdentityOnboardingSteps(
        identityTypeLoaded,
        identityLoaded?.status,
        asIssuer
      ),
      activeStep: getActiveStep(identityLoaded?.status)
    }
  }

  if (identityType === undefined) {
    return {
      steps: defaultOnboardingSteps,
      activeStep: 1
    }
  }

  const identityStatus =
    identityType === 'individual'
      ? individualIdentity?.status
      : corporateIdentities.list[0]?.status

  return {
    steps: getIdentityOnboardingSteps(identityType, identityStatus, asIssuer),
    activeStep: getActiveStep(identityStatus)
  }
}
