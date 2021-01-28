import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { useAuth } from 'hooks/auth/useAuth'
import { AccessReports } from 'app/pages/home/components/AccessReports'
import { OnboardingLinks } from 'app/pages/home/components/OnboardingLinks'

export const Onboarding = () => {
  const { user } = useAuth()
  const label = `Welcome, ${user?.name ?? 'Unknown'}`

  useSetPageTitle(label)

  return (
    <Fragment>
      <Typography variant='subtitle1'>Please, create your account</Typography>
      <Box my={5} />

      <Grid container direction='column' spacing={10}>
        <Grid item xs={12}>
          <OnboardingLinks />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h3'>Access Reports</Typography>
          <Box my={2.5} />
          <AccessReports />
        </Grid>
      </Grid>
    </Fragment>
  )
}
