import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { TopIssuers } from 'app/pages/home/components/TopIssuers'
import { TopCorporates } from 'app/pages/home/components/TopCorporates'
import { Divider } from 'ui/Divider'
import { News as NewsComponent } from 'app/pages/home/components/News/News'
import { RootContainer } from 'ui/RootContainer'
import { BannersCarousel } from 'app/pages/invest/components/BannersCarousel'
import { VSpacer } from 'components/VSpacer'

export const News = () => {
  return (
    <RootContainer>
      <VSpacer size={'small'} />
      <Fragment>
        <Grid container direction='column' spacing={10}>
          <Grid item xs={12}>
            <NewsComponent />
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
