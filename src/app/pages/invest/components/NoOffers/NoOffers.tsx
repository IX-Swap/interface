import React from 'react'
import { Grid, Typography } from '@mui/material'
import { ReactComponent as MoonIcon } from './image/moon.svg'

export interface NoOffersProps {
  forTable?: boolean
}

export const NoOffers = ({ forTable = false }: NoOffersProps) => (
  <Grid
    container
    justifyContent={'center'}
    alignItems={'center'}
    direction={'column'}
    sx={theme => ({
      border: forTable
        ? 'none'
        : `1px dashed ${theme.palette.button.borderOutlined}`,
      py: theme.spacing(3),
      borderTopRightRadius: forTable ? 0 : 8,
      borderTopLeftRadius: forTable ? 0 : 8,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      backgroundColor: forTable ? theme.palette.background.paper : 'transparent'
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
