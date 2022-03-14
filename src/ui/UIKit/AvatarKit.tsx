import { Grid, Paper } from '@mui/material'
import React from 'react'
import TestIcon from './test.svg'
import { CustomAvatar } from '../CustomAvatar'
import { UIKitThemeWrapper } from 'ui/UIKitThemeWrapper'

export const AvatarKit = () => {
  return (
    <UIKitThemeWrapper>
      <Paper sx={{ padding: 2 }} elevation={0}>
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
      </Paper>
    </UIKitThemeWrapper>
  )
}
