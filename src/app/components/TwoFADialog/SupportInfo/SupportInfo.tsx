import React from 'react'
import { Typography } from '@mui/material'
import { useStyles } from 'app/components/TwoFADialog/SupportInfo/SupportInfo.styles'

export const SupportInfo = () => {
  const classes = useStyles()
  const websiteUrl = process.env.WEBSITE_URL ?? 'https://investax.io'

  return (
    <Typography variant={'body1'}>
      If you have any further questions, you can always contact our{' '}
      <a className={classes.link} href={`${websiteUrl}/contact/`}>
        support department
      </a>
    </Typography>
  )
}
