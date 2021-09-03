import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { AccessReports } from 'app/pages/home/components/AccessReports'
import { TopIssuers } from 'app/pages/home/components/TopIssuers'
import { TopCorporates } from 'app/pages/home/components/TopCorporates'
import { Divider } from 'ui/Divider'
import { News } from 'app/pages/home/components/News/News'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { BannersCarousel } from 'app/pages/invest/components/BannersCarousel'

export const Onboarding = () => {
  const { user } = useAuth()

  return (
    <RootContainer>
      <PageHeader
        alignment='flex-start'
        title={`Welcome, ${user?.name ?? ''}`}
      />
      <Fragment>
        <Grid container direction='column' spacing={10}>
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
            <BannersCarousel />
          </Grid>
        </Grid>
      </Fragment>
    </RootContainer>
  )
}
