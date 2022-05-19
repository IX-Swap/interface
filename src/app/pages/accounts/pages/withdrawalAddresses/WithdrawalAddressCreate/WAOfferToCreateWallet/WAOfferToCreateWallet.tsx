import React from 'react'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import useStyles from './WAOfferToCreateWallet.styles'

export interface WAOfferToCreateWalletProps {
  onClick: () => void
}

export const WAOfferToCreateWallet = ({
  onClick
}: WAOfferToCreateWalletProps) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Grid item>
      <Typography color={theme.palette.text.secondary} variant={'body2'}>
        Do not have address?{' '}
        <Box component={'span'} className={classes.link} onClick={onClick}>
          Let’s create
        </Box>
      </Typography>
    </Grid>
  )
}
