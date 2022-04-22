import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import {
  defaultOnboardingSteps,
  getIdentityOnboardingSteps
} from 'app/hooks/onboarding/utils'
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

  const getIdentityActiveStep = (status?: AuthorizableStatus | 'Skipped') => {
    let indetityActiveStep = 1

    if (!asIssuer) {
      indetityActiveStep = 2
    }
    if (
      asIssuer &&
      detailsOfIssuance !== undefined &&
      (detailsOfIssuance.status === 'Approved' ||
        (detailsOfIssuance.skipped !== undefined && detailsOfIssuance.skipped))
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

  const getActiveStep = (status?: AuthorizableStatus | 'Skipped') => {
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

  const getIdentityStatus = () => {
    if (asIssuer) {
      return detailsOfIssuance?.skipped !== undefined &&
        detailsOfIssuance?.skipped &&
        getIdentityActiveStep() === 1
        ? 'Skipped'
        : corporateIdentities.list[0]?.status
    }

    if (identityType === 'corporate') {
      return corporateIdentities.list[0]?.status
    }

    return individualIdentity?.status
  }

  return {
    steps: getIdentityOnboardingSteps({
      identityType: identityType,
      identityStatus: getIdentityStatus(),
      asIssuer: asIssuer,
      issuanceDetailsStatus:
        detailsOfIssuance?.skipped !== undefined && detailsOfIssuance?.skipped
          ? 'Skipped'
          : detailsOfIssuance?.status
    }),
    activeStep: getActiveStep(getIdentityStatus())
  }
}
