import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
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

  const fundManagerIdentities = corporateIdentities.list.filter(
    identity => identity.type === 'Fund Manager'
  )

  const fundAdminIdentities = corporateIdentities.list.filter(
    identity => identity.type === 'Fund Administrator'
  )

  const portfolioManagerIdentities = corporateIdentities.list.filter(
    identity => identity.type === 'Portfolio Manager'
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
  const isFundManagerJourneyStarted =
    fundManagerIdentities.length > 0 &&
    fundManagerIdentities[0].authorizations.length === 0
  const isFundAdminJourneyStarted =
    fundAdminIdentities.length > 0 &&
    fundAdminIdentities[0].authorizations.length === 0
  const isPortfolioManagerJourneyStarted =
    portfolioManagerIdentities.length > 0 &&
    portfolioManagerIdentities[0].authorizations.length === 0

  const startedJourneys = {
    isIndividualJourneyStarted,
    isInvestorJourneyStarted,
    isIssuerJourneyStarted,
    isFundManagerJourneyStarted,
    isFundAdminJourneyStarted,
    isPortfolioManagerJourneyStarted
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
  const isFundManagerJourneyCompleted =
    fundManagerIdentities.length > 0 &&
    fundManagerIdentities[0].authorizations?.some(
      authorization => authorization.status === 'Approved'
    )
  const isFundAdminJourneyCompleted =
    fundAdminIdentities.length > 0 &&
    fundAdminIdentities[0].authorizations?.some(
      authorization => authorization.status === 'Approved'
    )
  const isPortoflioManagerJourneyCompleted =
    portfolioManagerIdentities.length > 0 &&
    portfolioManagerIdentities[0].authorizations?.some(
      authorization => authorization.status === 'Approved'
    )

  const completedJourneys = {
    isIndividualJourneyCompleted,
    isInvestorJourneyCompleted,
    isIssuerJourneyCompleted,
    isFundManagerJourneyCompleted,
    isFundAdminJourneyCompleted,
    isPortoflioManagerJourneyCompleted
  }
  const isMultipleJourneysActive =
    Object.values(startedJourneys).filter(journeStatus => journeStatus).length >
    1
  const hasActiveIdentityJourney = Object.values(startedJourneys).some(
    journey => journey
  )

  const getIsJourneyCompleted = (
    identityType: IdentityType,
    corporateType?: CorporateType
  ) => {
    if (identityType === 'individual') return isIndividualJourneyCompleted

    switch (corporateType) {
      case 'issuer':
        return isIssuerJourneyCompleted
      case 'Fund Manager':
        return isFundManagerJourneyCompleted
      case 'Fund Administrator':
        return isFundAdminJourneyCompleted
      case 'Portfolio Manager':
        return isPortoflioManagerJourneyCompleted
      default:
        return isInvestorJourneyCompleted
    }
  }

  return {
    ...completedJourneys,
    ...startedJourneys,
    isMultipleJourneysActive,
    hasActiveIdentityJourney,
    investorIdentities,
    issuerIdentities,
    fundManagerIdentities,
    fundAdminIdentities,
    portfolioManagerIdentities,
    individualIdentity,
    getIsJourneyCompleted,
    isIdentitiesLoaded,
    detailsOfIssuance
  }
}
