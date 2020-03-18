import React from 'react'
import { Grid, Box, Hidden } from '@material-ui/core'
import { IdentityProvider } from 'context/IdentityContext'
import IdentityOverview from './components/IdentityOverview'
import IdentityProgress from 'pages/identity/components/IdentityProgress'

export default function IdentityDashboard () {
  const idProgressJsx =
    <IdentityProgress title='Identification' steps={['', '', '']} activeStep={0} percentage='0' />

  return (
    <IdentityProvider>
      <Grid component='article' container spacing={3}>
        <Grid item xs={12}>
          <Hidden mdUp>
            {idProgressJsx}
          </Hidden>
        </Grid>
        <Grid component='section' item xs={12} md={7}>
          <IdentityOverview />
        </Grid>
        <Grid item xs={12} md={5}>
          <Hidden smDown>
            {idProgressJsx}
          </Hidden>
          <Box mt={3}>
            <IdentityProgress title='Financials' steps={['', '', '']} activeStep={0} percentage='0' />
          </Box>
          <Box mt={3}>
            <IdentityProgress title='Accreditation' steps={['', '', '']} activeStep={0} percentage='0' />
          </Box>
          <Box mt={3}>
            <IdentityProgress title='Confirmation' steps={['', '', '']} activeStep={0} percentage='0' />
          </Box>
        </Grid>
      </Grid>
    </IdentityProvider>
  )
}
