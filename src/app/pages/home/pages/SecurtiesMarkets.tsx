import { Grid, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { SecuritiesMarketsTabs } from 'app/pages/home/components/SecuritiesMarketsTabs/SecuritiesMarketsTabs'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import AtlasLogoDark from 'assets/icons/atlas_logo.png'
import AtlasLogoLight from 'assets/icons/atlas_logo_white.png'

export const SecuritiesMarkets = () => {
  const theme = useTheme()

  return (
    <RootContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} container spacing={2} wrap='nowrap'>
          <Grid item container spacing={1} alignItems='center' wrap='nowrap'>
            <Typography variant='h4' style={{ marginRight: 36 }}>
              Research Terminal
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
                theme.palette.type === 'light' ? AtlasLogoDark : AtlasLogoLight
              }
              alt={'Atlas One Logo'}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SecuritiesMarketsTabs />
        </Grid>
      </Grid>
    </RootContainer>
  )
}
