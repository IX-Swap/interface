import React from 'react'
import { Box, Hidden, Typography } from '@material-ui/core'
import { OnboardingLink } from 'app/pages/home/components/OnboardingLink'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as FundraiseIcon } from 'assets/icons/navigation/asset-balance.svg'
import { useIdentitiesRouter } from 'app/pages/identity/router'

export const OnboardingLinks = () => {
  const { paths: identityPaths } = useIdentitiesRouter()

  return (
    <Box display='flex'>
      <Box>
        <Typography variant='h4'>Invest</Typography>
        <Box my={2.5} />
        <Box display='flex'>
          <OnboardingLink
            label='Individual'
            link={identityPaths.createIndividual}
            icon={IndividualIcon}
            color='#90A30F'
          />
          <Box mx={1.5} />
          <OnboardingLink
            label='Corporate'
            link={identityPaths.createCorporate}
            color='#E65133'
            icon={CorporateIcon}
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
          label='Fundraise'
          link={identityPaths.createCorporate}
          icon={FundraiseIcon}
          color='#2b78fd'
        />
      </Box>
    </Box>
  )
}
