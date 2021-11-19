import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import useStyles from './WAOfferToCreateWallet.styles'

export interface WAInfoFieldsProps {
  onClick: () => void
}

export const WAOfferToCreateWallet = ({ onClick }: WAInfoFieldsProps) => {
  const classes = useStyles()

  return (
    <Grid item>
      <Typography variant={'body2'} className={classes.text}>
        Do not have address?{' '}
        <Box component={'span'} className={classes.link} onClick={onClick}>
          Let’s create
        </Box>
      </Typography>
    </Grid>
  )
}
