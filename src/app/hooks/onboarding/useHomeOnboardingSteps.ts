import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import {
  defaultOnboardingSteps,
  getIdentityOnboardingSteps
} from 'app/hooks/onboarding/utils'
import { AuthorizableStatus } from 'types/util'

export const useHomeOnboardingSteps = () => {
  const {
    isMultipleJourneysActive,
    isIndividualJourneyStarted,
    isCorporateJourneyStarted,
    hasActiveIdentityJourney,
    individualIdentity,
    corporateIdentities,
    detailsOfIssuance
  } = useOnboardingJourneys()

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

  if (isMultipleJourneysActive) {
    return {
      steps: defaultOnboardingSteps,
      activeStep: 1
    }
  }

  if (detailsOfIssuance !== undefined) {
    return {
      steps: getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: '',
        asIssuer: true,
        issuanceDetailsStatus:
          detailsOfIssuance.skipped !== undefined && detailsOfIssuance.skipped
            ? 'Skipped'
            : detailsOfIssuance.status
      }),
      activeStep: detailsOfIssuance.status === 'Submitted' ? 1 : getActiveStep()
    }
  }

  if (hasActiveIdentityJourney) {
    const activeJourneyIdentityStatus = isIndividualJourneyStarted
      ? individualIdentity?.status
      : corporateIdentities[0].status

    return {
      steps: getIdentityOnboardingSteps({
        identityType: isIndividualJourneyStarted ? 'individual' : 'corporate',
        identityStatus: activeJourneyIdentityStatus,
        asIssuer:
          isCorporateJourneyStarted && corporateIdentities[0].type === 'issuer'
      }),
      activeStep: getActiveStep(activeJourneyIdentityStatus)
    }
  }

  return {
    steps: defaultOnboardingSteps,
    activeStep: 1
  }
}
