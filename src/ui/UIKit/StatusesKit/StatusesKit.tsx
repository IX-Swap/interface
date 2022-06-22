import React from 'react'
import { Grid, Typography } from '@mui/material'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { Status } from 'ui/Status/Status'

export const StatusesKit = () => {
  return (
    <UIKitThemeWrapper>
      <Grid container spacing={4} flexDirection={'column'}>
        <Grid item>
          <Typography variant={'h3'}>Statuses</Typography>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <Grid item>
            <Status label={'Approved'} type={'approved'} />
          </Grid>
          <Grid item>
            <Status label={'Submitted'} type={'submitted'} />
          </Grid>
          <Grid item>
            <Status label={'Rejected'} type={'rejected'} />
          </Grid>
          <Grid item>
            <Status label={'Draft'} type={'draft'} />
          </Grid>
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}
