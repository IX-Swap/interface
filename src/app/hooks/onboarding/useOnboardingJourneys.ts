import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { IdentityType } from 'app/pages/identity/utils/shared'

export const useOnboardingJourneys = () => {
  const {
    individualIdentity,
    corporateIdentities,
    isIdentitiesLoaded,
    detailsOfIssuance
  } = useGetIdentities()

  const isIndividualJourneyStarted =
    individualIdentity !== undefined &&
    individualIdentity.authorizations.length === 0
  const isCorporateJourneyStarted =
    corporateIdentities.list.length > 0 &&
    corporateIdentities.list[0].authorizations.length === 0

  const startedJourneys = {
    isIndividualJourneyStarted,
    isCorporateJourneyStarted
  }

  const isIndividualJourneyCompleted =
    individualIdentity?.authorizations.some(
      authorization => authorization.status === 'Approved'
    ) ?? false

  const isCorporateJourneyCompleted =
    corporateIdentities.list.length > 0 &&
    corporateIdentities.list[0].authorizations.some(
      authorization => authorization.status === 'Approved'
    )

  const completedJourneys = {
    isIndividualJourneyCompleted,
    isCorporateJourneyCompleted
  }
  const isMultipleJourneysActive =
    Object.values(startedJourneys).filter(journeStatus => journeStatus).length >
    1
  const hasActiveIdentityJourney = Object.values(startedJourneys).some(
    journey => journey
  )

  const getIsJourneyCompleted = (identityType: IdentityType) => {
    if (identityType === 'individual') {
      return isIndividualJourneyCompleted
    }

    return isCorporateJourneyCompleted
  }

  return {
    ...completedJourneys,
    ...startedJourneys,
    isMultipleJourneysActive,
    hasActiveIdentityJourney,
    corporateIdentities: corporateIdentities.list,
    individualIdentity,
    getIsJourneyCompleted,
    isIdentitiesLoaded,
    detailsOfIssuance
  }
}
