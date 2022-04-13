import React from 'react'
import { Typography } from '@mui/material'
import { useStyles } from './TwoFASupportInfo.styles'

export const TwoFASupportInfo = () => {
  const classes = useStyles()
  return (
    <Typography variant={'body1'}>
      If you have any further questions, you can always contact our
      <a className={classes.link} href={'https://investax.io/contact/'}>
        support department
      </a>
    </Typography>
  )
}
