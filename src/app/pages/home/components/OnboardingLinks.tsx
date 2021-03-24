import React from 'react'
import { Box, Hidden, Typography } from '@material-ui/core'
import { OnboardingLink } from 'app/pages/home/components/OnboardingLink'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as FundraiseIcon } from 'assets/icons/navigation/asset-balance.svg'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { IdentityRoute } from 'app/pages/_identity/router/config'

export const OnboardingLinks = () => {
  const {
    data: individualIdentity,
    isLoading: individualIdentityIsLoading
  } = useIndividualIdentity()

  const {
    data: corprateIdentities,
    isLoading: corprateIdentitiesIsLoading
  } = useAllCorporates({})

  const individualLink =
    !individualIdentityIsLoading && individualIdentity !== undefined
      ? {
          to: IdentityRoute.editIndividual,
          params: {
            identityId: individualIdentity._id,
            userId: individualIdentity.user._id
          }
        }
      : { to: IdentityRoute.createIndividual }
  const isIndividualDone =
    !individualIdentityIsLoading &&
    individualIdentity !== undefined &&
    individualIdentity.authorizations?.some(
      ({ status }) => status === 'Approved'
    )

  const investorIdentities = corprateIdentities.list.filter(
    identity => identity.type === 'investor'
  )
  const investorLink =
    !corprateIdentitiesIsLoading && investorIdentities.length > 0
      ? {
          to: IdentityRoute.editCorporate,
          params: {
            identityId: investorIdentities[0]._id,
            userId: investorIdentities[0].user._id
          }
        }
      : { to: IdentityRoute.createCorporate }
  const isInvestorDone =
    !corprateIdentitiesIsLoading &&
    investorIdentities.length > 0 &&
    investorIdentities[0].authorizations?.some(
      ({ status }) => status === 'Approved'
    )

  const issuerIdentities = corprateIdentities.list.filter(
    identity => identity.type === 'issuer'
  )
  const issuerLink =
    !corprateIdentitiesIsLoading && issuerIdentities.length > 0
      ? {
          to: IdentityRoute.editIssuer,
          params: {
            identityId: issuerIdentities[0]._id,
            userId: issuerIdentities[0].user._id
          }
        }
      : { to: IdentityRoute.createIssuer }
  const isIssuerDone =
    !corprateIdentitiesIsLoading &&
    issuerIdentities.length > 0 &&
    issuerIdentities[0].authorizations?.some(
      ({ status }) => status === 'Approved'
    )

  return (
    <Box display='flex'>
      <Box>
        <Typography variant='h4'>Invest</Typography>
        <Box my={2.5} />
        <Box display='flex'>
          <OnboardingLink
            {...individualLink}
            label='Individual'
            icon={IndividualIcon}
            color='#90A30F'
            done={isIndividualDone}
          />
          <Box mx={1.5} />
          <OnboardingLink
            {...investorLink}
            label='Corporate'
            color='#E65133'
            icon={CorporateIcon}
            done={isInvestorDone}
          />
        </Box>
      </Box>

      <Box mx={1.5} />

      <Hidden mdDown>
        <Box mx={16} />
      </Hidden>

      <Box>
        <Typography variant='h4'>Raise Capital</Typography>
        <Box my={2.5} />
        <OnboardingLink
          {...issuerLink}
          label='Fundraise'
          icon={FundraiseIcon}
          color='#2b78fd'
          done={isIssuerDone}
        />
      </Box>
    </Box>
  )
}
