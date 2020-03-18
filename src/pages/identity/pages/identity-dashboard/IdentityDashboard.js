import React from 'react'
import { Grid, Box, Hidden } from '@material-ui/core'
import IdentityOverview from './components/IdentityOverview'
import ProgressCard from './components/ProgressCard'
import IdentityProgress from 'pages/identity/components/IdentityProgress'

export default function IdentityDashboard () {
  const idProgressJsx =
    <ProgressCard title='Identification' component={IdentityProgress} steps={['', '', '']} activeStep={0} percentage='0' />

  return (
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
          <ProgressCard title='Financials' component={IdentityProgress} activeStep={0} percentage='0' />
        </Box>
        <Box mt={3}>
          <ProgressCard title='Accreditation' component={IdentityProgress} activeStep={0} percentage='0' />
        </Box>
        <Box mt={3}>
          <ProgressCard title='Confirmation' component={IdentityProgress} activeStep={0} percentage='0' />
        </Box>
      </Grid>
    </Grid>
  )
}
