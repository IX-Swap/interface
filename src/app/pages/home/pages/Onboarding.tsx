import React, { Fragment } from 'react'
import { Box, Grid, Typography, useTheme } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { TopIssuers } from 'app/pages/home/components/TopIssuers'
import { TopCorporates } from 'app/pages/home/components/TopCorporates'
import { Divider } from 'ui/Divider'
import { News } from 'app/pages/home/components/News/News'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { BannersCarousel } from 'app/pages/invest/components/BannersCarousel'
import { Reports } from 'app/pages/home/components/AccessReports/Reports'
import AtlasLogoLight from 'assets/icons/atlas_logo_white.png'
import AtlasLogoDark from 'assets/icons/atlas_logo.png'

export const Onboarding = () => {
  const { user } = useAuth()
  const theme = useTheme()

  return (
    <RootContainer>
      <PageHeader
        alignment='flex-start'
        title={`Welcome, ${user?.name ?? ''}`}
      />
      <Fragment>
        <Grid container direction='column' spacing={10}>
          <Grid item xs={12}>
            <Grid item container spacing={1} alignItems='center' wrap='nowrap'>
              <Typography variant='h4' style={{ marginRight: 36 }}>
                Access Reports
              </Typography>
              <Typography
                variant='body2'
                style={{ lineHeight: '100%', marginRight: 8 }}
              >
                In Partnership With
              </Typography>
              <img
                width={106}
                height={34}
                src={
                  theme.palette.type === 'light'
                    ? AtlasLogoDark
                    : AtlasLogoLight
                }
                alt={'Atlas One Logo'}
              />
            </Grid>
            <Box my={2.5} />
            <Reports />
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
