import React from 'react'
import { Box, Typography } from '@mui/material'
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg'
import { useStyles } from './VerificationInfo.styles'

export const VerificationInfo = () => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <InfoIcon />
      <Typography variant={'body1'} className={classes.text}>
        Verification code has been sent
      </Typography>
    </Box>
  )
}
