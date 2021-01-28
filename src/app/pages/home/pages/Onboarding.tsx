import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { useAuth } from 'hooks/auth/useAuth'
import { OnboardingLink } from 'app/pages/home/components/OnboardingLink'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as FundraiseIcon } from 'assets/icons/navigation/asset-balance.svg'
import { useIssuanceRouter } from 'app/pages/issuance/router'

export const Onboarding = () => {
  const { user } = useAuth()
  const label = `Welcome, ${user?.name ?? 'Unknown'}`
  const { paths: identityPaths } = useIdentitiesRouter()
  const { paths: issuancePaths } = useIssuanceRouter()

  useSetPageTitle(label)

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Please, create your account</Typography>
      </Grid>

      <Grid item xs={12}>
        <Box display='flex'>
          <Box>
            <Typography variant='h3'>Invest</Typography>
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

          <Box mx={4} />

          <Box>
            <Typography variant='h3'>Raise Capital</Typography>
            <Box my={2.5} />
            <OnboardingLink
              label='Fundraise'
              link={issuancePaths.create}
              icon={FundraiseIcon}
              color='#2b78fd'
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
