import React from 'react'
import { Box, Hidden, Typography } from '@material-ui/core'
import { OnboardingLink } from 'app/pages/educationCentre/components/OnboardingLink'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as FundraiseIcon } from 'assets/icons/navigation/asset-balance.svg'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'

export const OnboardingLinks = () => {
  const {
    isIndividualJourneyCompleted,
    isInvestorJourneyCompleted,
    isIssuerJourneyCompleted,
    individualIdentity,
    investorIdentities,
    isIdentitiesLoaded,
    issuerIdentities,
    detailsOfIssuance
  } = useOnboardingJourneys()

  const individualLink =
    isIdentitiesLoaded && individualIdentity !== undefined
      ? {
          to: IdentityRoute.editIndividual,
          params: {
            identityId: individualIdentity._id,
            userId: individualIdentity.user._id
          }
        }
      : { to: IdentityRoute.createIndividual }

  const investorLink =
    isIdentitiesLoaded &&
    investorIdentities !== undefined &&
    investorIdentities.length > 0
      ? {
          to: IdentityRoute.editCorporate,
          params: {
            identityId: investorIdentities[0]._id,
            userId: investorIdentities[0].user._id
          }
        }
      : { to: IdentityRoute.createCorporate }

  const issuerLink =
    isIdentitiesLoaded &&
    issuerIdentities !== undefined &&
    issuerIdentities.length > 0
      ? {
          to: IdentityRoute.editIssuer,
          params: {
            identityId: issuerIdentities[0]._id,
            userId: issuerIdentities[0].user._id
          }
        }
      : { to: IdentityRoute.createIssuer }

  const detailsOfIssuanceLink = { to: IdentityRoute.createDetailsOfIssuance }

  const fundraiseLink =
    isIdentitiesLoaded &&
    detailsOfIssuance !== undefined &&
    detailsOfIssuance.status === 'Approved'
      ? issuerLink
      : detailsOfIssuanceLink

  const renderIndividualOnboardingLink = () => {
    if (isInvestorJourneyCompleted || isIssuerJourneyCompleted) {
      return null
    }

    return (
      <>
        <OnboardingLink
          {...individualLink}
          label='Individual'
          icon={IndividualIcon}
          color='#90A30F'
          done={isIndividualJourneyCompleted}
        />
        <Box mx={1.5} />
      </>
    )
  }

  const renderInvestorOnboardingLink = () => {
    if (isIndividualJourneyCompleted) {
      return null
    }

    return (
      <OnboardingLink
        {...investorLink}
        label='Corporate'
        color='#E65133'
        icon={CorporateIcon}
        done={isInvestorJourneyCompleted}
      />
    )
  }

  const renderFundraisingOnboardingLinkBlock = () => {
    if (isIndividualJourneyCompleted) {
      return null
    }

    return (
      <Box>
        <Typography variant='h4'>Raise Capital</Typography>
        <Box my={2.5} />
        <OnboardingLink
          {...fundraiseLink}
          label='Fundraise'
          icon={FundraiseIcon}
          color='#2b78fd'
          done={isIssuerJourneyCompleted}
        />
      </Box>
    )
  }

  return (
    <Box display='flex'>
      <Box>
        <Typography variant='h4'>Invest</Typography>
        <Box my={2.5} />
        <Box display='flex'>
          {renderIndividualOnboardingLink()}
          {renderInvestorOnboardingLink()}
        </Box>
      </Box>
      <Box mx={1.5} />
      <Hidden mdDown>
        <Box mx={16} />
      </Hidden>
      {renderFundraisingOnboardingLinkBlock()}
    </Box>
  )
}
