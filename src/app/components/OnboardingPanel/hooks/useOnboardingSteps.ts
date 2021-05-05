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
    corporateIdentities,
    detailsOfIssuance
  } = useGetIdentities(asIssuer ? 'issuer' : 'investor')

  const getIdentityActiveStep = (status?: AuthorizableStatus) => {
    let indetityActiveStep = 1

    if (!asIssuer) {
      indetityActiveStep = 2
    }
    if (
      asIssuer &&
      detailsOfIssuance !== undefined &&
      detailsOfIssuance.status === 'Approved'
    ) {
      indetityActiveStep = 2
    }
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
      steps: getIdentityOnboardingSteps({
        identityType: identityTypeLoaded,
        identityStatus: identityLoaded?.status,
        asIssuer
      }),
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
    steps: getIdentityOnboardingSteps({
      identityType: identityType,
      identityStatus: identityStatus,
      asIssuer: asIssuer,
      issuanceDetailsStatus: detailsOfIssuance?.status
    }),
    activeStep: getActiveStep(identityStatus)
  }
}
