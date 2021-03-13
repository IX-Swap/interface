import React from 'react'
import { Box, Hidden, Typography } from '@material-ui/core'
import { OnboardingLink } from 'app/pages/home/components/OnboardingLink'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as FundraiseIcon } from 'assets/icons/navigation/asset-balance.svg'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'

export const OnboardingLinks = () => {
  const { paths: identityPaths } = useIdentitiesRouter()
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
          to: identityPaths.editIndividual,
          params: {
            identityId: individualIdentity._id
          }
        }
      : { to: identityPaths.createIndividual }
  const isIndividualDone =
    !individualIdentityIsLoading &&
    individualIdentity !== undefined &&
    individualIdentity.authorizations?.some(
      ({ status }) => status === 'Approved'
    )

  const investorLink =
    !corprateIdentitiesIsLoading &&
    corprateIdentities !== undefined &&
    corprateIdentities.list.length > 0
      ? {
          to: identityPaths.editCorporate,
          params: {
            identityId: corprateIdentities.list[0]._id
          }
        }
      : { to: identityPaths.createCorporate }
  const isInvestorDone =
    !corprateIdentitiesIsLoading &&
    corprateIdentities !== undefined &&
    corprateIdentities.list.length > 0 &&
    corprateIdentities.list[0].authorizations?.some(
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
          {...investorLink}
          label='Fundraise'
          icon={FundraiseIcon}
          color='#2b78fd'
        />
      </Box>
    </Box>
  )
}
