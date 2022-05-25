import { Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

export const TaxDeclarationInfoContent = () => {
  const theme = useTheme()
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Typography align='left' color={theme.palette.text.secondary}>
          Foreign Account Tax Compliance Act aims to collect information on
          United States (US) Tax residents using foreign accounts. It requires
          Financial Institutions outside the US to report customers who are US
          tax residents to the US tax authorities.
        </Typography>
      </Grid>
      <Grid item>
        <Typography align='left' color={theme.palette.text.secondary}>
          InvestaX is collecting information regarding tax residency status of
          each Account holder in order to comply with Income Tax Act and
          Singapore Income Tax (International Tax Compliance Agreements)(Common
          Reporting Standard) Regulations 2016.
        </Typography>
      </Grid>
    </Grid>
  )
}
