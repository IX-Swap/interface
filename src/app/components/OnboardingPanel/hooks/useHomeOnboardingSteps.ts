import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import {
  defaultOnboardingSteps,
  getIdentityOnboardingSteps
} from 'app/components/OnboardingPanel/hooks/utils'
import { AuthorizableStatus } from 'types/util'

export const useHomeOnboardingSteps = () => {
  const { individualIdentity, corporateIdentities } = useGetIdentities()

  const investorIdentities = corporateIdentities.list.filter(
    identity => identity.type === 'investor'
  )
  const issuerIdentities = corporateIdentities.list.filter(
    identity => identity.type === 'issuer'
  )

  const isIndividualJourneyActive =
    individualIdentity !== undefined &&
    individualIdentity.authorizations?.length === 0
  const isInvestorJourneyActive =
    investorIdentities.length > 0 &&
    investorIdentities[0].authorizations?.length === 0
  const isIssuerJourneyActive =
    issuerIdentities.length > 0 &&
    issuerIdentities[0].authorizations?.length === 0

  const journeys = {
    isIndividualJourneyActive,
    isInvestorJourneyActive,
    isIssuerJourneyActive
  }
  const isMultipleJourneysActive =
    Object.values(journeys).filter(journeStatus => journeStatus === true)
      .length > 1
  const hasActiveJourney = Object.values(journeys).some(
    journey => journey === true
  )

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

  if (hasActiveJourney) {
    const activeJourneyIdentityStatus = journeys.isIndividualJourneyActive
      ? individualIdentity?.status
      : journeys.isIssuerJourneyActive
      ? issuerIdentities[0].status
      : investorIdentities[0].status

    return {
      steps: getIdentityOnboardingSteps(
        journeys.isIndividualJourneyActive ? 'individual' : 'corporate',
        activeJourneyIdentityStatus,
        journeys.isIssuerJourneyActive
      ),
      activeStep: getActiveStep(activeJourneyIdentityStatus)
    }
  }

  return {
    steps: defaultOnboardingSteps,
    activeStep: 1
  }
}
