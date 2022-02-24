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
    isFundManagerJourneyStarted,
    isFundAdminJourneyStarted,
    isPortfolioManagerJourneyStarted,
    hasActiveIdentityJourney,
    individualIdentity,
    investorIdentities,
    issuerIdentities,
    fundManagerIdentities,
    fundAdminIdentities,
    portfolioManagerIdentities,
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
    const coporateIdenty = () => {
      if (isIssuerJourneyStarted) {
        return issuerIdentities[0].status
      }
      if (isFundManagerJourneyStarted) {
        return fundManagerIdentities[0].status
      }
      if (isFundAdminJourneyStarted) {
        return fundAdminIdentities[0].status
      }
      if (isPortfolioManagerJourneyStarted) {
        return portfolioManagerIdentities[0].status
      }
      return investorIdentities[0].status
    }

    const activeJourneyIdentityStatus = isIndividualJourneyStarted
      ? individualIdentity?.status
      : coporateIdenty()

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
