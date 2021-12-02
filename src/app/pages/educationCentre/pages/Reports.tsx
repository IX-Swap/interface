import React, { Fragment } from 'react'
import { Box, Grid, Typography, useTheme } from '@material-ui/core'
import { RootContainer } from 'ui/RootContainer'
import { Reports as ReportsComponent } from 'app/pages/educationCentre/components/AccessReports/Reports'
import AtlasLogoLight from 'assets/icons/atlas_logo_white.png'
import AtlasLogoDark from 'assets/icons/atlas_logo.png'
import { VSpacer } from 'components/VSpacer'

export const Reports = () => {
  const theme = useTheme()

  return (
    <RootContainer>
      <VSpacer size={'small'} />
      <Fragment>
        <Grid container direction='column' spacing={10}>
          <Grid item xs={12}>
            <Grid item container spacing={1} alignItems='center' wrap='nowrap'>
              <Typography variant='h2'>Reports</Typography>
              <Typography
                variant='body2'
                style={{
                  lineHeight: '100%',
                  marginRight: theme.spacing(1),
                  marginLeft: theme.spacing(2)
                }}
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
            <ReportsComponent />
          </Grid>
        </Grid>
      </Fragment>
    </RootContainer>
  )
}
