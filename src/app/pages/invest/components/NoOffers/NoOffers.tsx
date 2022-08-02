import React from 'react'
import { Grid, Typography } from '@mui/material'
import { ReactComponent as MoonIcon } from './image/moon.svg'

export const NoOffers = () => (
  <Grid
    container
    justifyContent={'center'}
    alignItems={'center'}
    direction={'column'}
    sx={theme => ({
      border: `1px dashed ${theme.palette.button.borderOutlined}`,
      py: theme.spacing(3),
      borderRadius: 2
    })}
  >
    <Grid item>
      <MoonIcon />
    </Grid>
    <Grid item mt={1.5}>
      <Typography variant={'h5'}>No offers yet</Typography>
    </Grid>
    <Grid item mt={1}>
      <Typography color={'text.secondary'} fontWeight={400}>
        No offers yet, please check back later
      </Typography>
    </Grid>
  </Grid>
)
