import { Grid, Typography } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { AlertsContainer } from 'ui/UIKit/AlertsKit/AlertsContainer'
import { Pagination } from 'ui/Pagination/Pagination'

export const PaginationKit = () => {
  return (
    <UIKitThemeWrapper>
      <Grid container spacing={4} flexDirection={'column'}>
        <Grid item>
          <Typography variant={'h3'}>Pagination</Typography>
        </Grid>
        <Grid item>
          <Typography>Basic</Typography>
        </Grid>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item>
            <Pagination count={13} />
          </Grid>
        </Grid>
      </Grid>

      <AlertsContainer />
    </UIKitThemeWrapper>
  )
}
