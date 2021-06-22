import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { useAuth } from 'hooks/auth/useAuth'
import { AccessReports } from 'app/pages/home/components/AccessReports'
import { OnboardingLinks } from 'app/pages/home/components/OnboardingLinks'
import { TopIssuers } from 'app/pages/home/components/TopIssuers'
import { TopCorporates } from 'app/pages/home/components/TopCorporates'
import { PromoBanner } from 'app/pages/invest/components/PromoBanner'
import { Divider } from 'ui/Divider'
import { News } from 'app/pages/home/components/News/News'

export const Onboarding = () => {
  const { user } = useAuth()
  const label = `Welcome, ${user?.name ?? 'Unknown'}`

  useSetPageTitle(label)

  return (
    <Fragment>
      <Typography variant='subtitle1'>Please create your account</Typography>
      <Box my={5} />

      <Grid container direction='column' spacing={10}>
        <Grid item xs={12}>
          <OnboardingLinks />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h4'>Access Reports</Typography>
          <Box my={2.5} />
          <AccessReports />
        </Grid>

        <Grid item xs={12}>
          <News />
        </Grid>

        <Grid container item xs={12}>
          <Divider mb={7} />
          <Box display='flex' width='100%'>
            <Box flex='1 1 auto'>
              <Typography variant='h4'>Top Issuers</Typography>
              <Box my={2.5} />
              <TopIssuers />
            </Box>

            <Divider vertical mr={6} />

            <Box flex='1 1 auto'>
              <Typography variant='h4'>Top Corporates</Typography>
              <Box my={2.5} />
              <TopCorporates />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <PromoBanner />
        </Grid>
      </Grid>
    </Fragment>
  )
}
