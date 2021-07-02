import { Grid, Typography } from '@material-ui/core'
import React from 'react'

export const TaxDeclarationInfoContent = () => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Typography align='center'>
          Foreign Account Tax Compliance Act aims to collect information on
          United States (US) Tax residents using foreign accounts. It requires
          Financial Institutions outside the US to report customers who are US
          tax residents to the US tax authorities.
        </Typography>
        <Typography align='center'>
          InvestaX is collecting information regarding tax residency status of
          each Account holder in order to comply with Income Tax Act and
          Singapore Income Tax (International Tax Compliance Agreements)(Common
          Reporting Standard) Regulations 2016.
        </Typography>
      </Grid>
    </Grid>
  )
}
