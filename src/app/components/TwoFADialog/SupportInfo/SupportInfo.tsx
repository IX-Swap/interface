import React from 'react'
import { Typography } from '@mui/material'
import { useStyles } from 'app/components/TwoFADialog/SupportInfo/SupportInfo.styles'
import { WEBSITE_URL } from 'config'

export const SupportInfo = () => {
  const classes = useStyles()

  return (
    <Typography variant={'body1'}>
      If you have any further questions, you can always contact our{' '}
      <a className={classes.link} href={`${WEBSITE_URL}/contact/`}>
        support department
      </a>
    </Typography>
  )
}
