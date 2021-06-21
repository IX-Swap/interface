import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import {
  defaultOnboardingSteps,
  getIdentityOnboardingSteps
} from 'app/components/OnboardingPanel/hooks/utils'
import { AuthorizableStatus } from 'types/util'

export const useHomeOnboardingSteps = () => {
  const {
    isMultipleJourneysActive,
    isIndividualJourneyStarted,
    isIssuerJourneyStarted,
    hasActiveIdentityJourney,
    individualIdentity,
    investorIdentities,
    issuerIdentities,
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
        issuanceDetailsStatus: detailsOfIssuance.status
      }),
      activeStep: detailsOfIssuance.status === 'Submitted' ? 1 : getActiveStep()
    }
  }

  if (hasActiveIdentityJourney) {
    const activeJourneyIdentityStatus = isIndividualJourneyStarted
      ? individualIdentity?.status
      : isIssuerJourneyStarted
      ? issuerIdentities[0].status
      : investorIdentities[0].status

    return {
      steps: getIdentityOnboardingSteps({
        identityType: isIndividualJourneyStarted ? 'individual' : 'corporate',
        identityStatus: activeJourneyIdentityStatus,
        asIssuer: isIssuerJourneyStarted
      }),
      activeStep: getActiveStep(activeJourneyIdentityStatus)
    }
  }

  return {
    steps: defaultOnboardingSteps,
    activeStep: 1
  }
}
