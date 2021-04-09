import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { IdentityType } from 'app/pages/identity/utils/shared'

export const useOnboardingJourneys = () => {
  const {
    individualIdentity,
    corporateIdentities,
    isIdentitiesLoaded,
    detailsOfIssuance
  } = useGetIdentities()

  const investorIdentities = corporateIdentities.list.filter(
    identity => identity.type === 'investor'
  )
  const issuerIdentities = corporateIdentities.list.filter(
    identity => identity.type === 'issuer'
  )

  const isIndividualJourneyStarted =
    individualIdentity !== undefined &&
    individualIdentity.authorizations.length === 0
  const isInvestorJourneyStarted =
    investorIdentities.length > 0 &&
    investorIdentities[0].authorizations.length === 0
  const isIssuerJourneyStarted =
    issuerIdentities.length > 0 &&
    issuerIdentities[0].authorizations.length === 0

  const startedJourneys = {
    isIndividualJourneyStarted,
    isInvestorJourneyStarted,
    isIssuerJourneyStarted
  }

  const isIndividualJourneyCompleted =
    individualIdentity?.authorizations.some(
      authorization => authorization.status === 'Approved'
    ) ?? false
  const isInvestorJourneyCompleted =
    investorIdentities.length > 0 &&
    investorIdentities[0].authorizations.some(
      authorization => authorization.status === 'Approved'
    )
  const isIssuerJourneyCompleted =
    issuerIdentities.length > 0 &&
    issuerIdentities[0].authorizations?.some(
      authorization => authorization.status === 'Approved'
    )

  const completedJourneys = {
    isIndividualJourneyCompleted,
    isInvestorJourneyCompleted,
    isIssuerJourneyCompleted
  }
  const isMultipleJourneysActive =
    Object.values(startedJourneys).filter(journeStatus => journeStatus).length >
    1
  const hasActiveIdentityJourney = Object.values(startedJourneys).some(
    journey => journey
  )

  const getIsJourneyCompleted = (
    identityType: IdentityType,
    corporateType?: 'issuer' | 'investor'
  ) => {
    if (identityType === 'individual') return isIndividualJourneyCompleted

    return corporateType === 'investor'
      ? isInvestorJourneyCompleted
      : isIssuerJourneyCompleted
  }

  return {
    ...completedJourneys,
    ...startedJourneys,
    isMultipleJourneysActive,
    hasActiveIdentityJourney,
    investorIdentities,
    issuerIdentities,
    individualIdentity,
    getIsJourneyCompleted,
    isIdentitiesLoaded,
    detailsOfIssuance
  }
}
