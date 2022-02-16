import { Grid } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { AppTheme, getAppTheme } from 'themes/new'
import TestIcon from './test.svg'
import { CustomAvatar } from '../CustomAvatar'

export const AvatarKit = () => {
  return (
    <ThemeProvider theme={getAppTheme(AppTheme.Light, true)}>
      <Grid container spacing={1} alignContent='center'>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item>
            <CustomAvatar>A</CustomAvatar>
          </Grid>
          <Grid item>
            <CustomAvatar src={TestIcon} />
          </Grid>
        </Grid>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item>
            <CustomAvatar hasBadge>A</CustomAvatar>
          </Grid>
          <Grid item>
            <CustomAvatar hasBadge src={TestIcon} />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
