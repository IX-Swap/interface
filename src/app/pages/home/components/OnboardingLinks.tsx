import React from 'react'
import { Box, Hidden, Typography } from '@material-ui/core'
import { OnboardingLink } from 'app/pages/home/components/OnboardingLink'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as FundraiseIcon } from 'assets/icons/navigation/asset-balance.svg'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'

export const OnboardingLinks = () => {
  const { paths: identityPaths } = useIdentitiesRouter()

  const {
    isIndividualJourneyCompleted,
    isInvestorJourneyCompleted,
    isIssuerJourneyCompleted,
    individualIdentity,
    investorIdentities,
    isIdentitiesLoaded,
    issuerIdentities
  } = useOnboardingJourneys()

  const individualLink =
    isIdentitiesLoaded && individualIdentity !== undefined
      ? {
          to: identityPaths.editIndividual,
          params: {
            identityId: individualIdentity._id
          }
        }
      : { to: identityPaths.createIndividual }

  const investorLink =
    isIdentitiesLoaded &&
    investorIdentities !== undefined &&
    investorIdentities.length > 0
      ? {
          to: identityPaths.editCorporate,
          params: {
            identityId: investorIdentities[0]._id
          }
        }
      : { to: identityPaths.createCorporate }

  const issuerLink =
    isIdentitiesLoaded &&
    issuerIdentities !== undefined &&
    issuerIdentities.length > 0
      ? {
          to: identityPaths.editIssuer,
          params: {
            identityId: issuerIdentities[0]._id
          }
        }
      : { to: identityPaths.createIssuer }

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
          {...issuerLink}
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
