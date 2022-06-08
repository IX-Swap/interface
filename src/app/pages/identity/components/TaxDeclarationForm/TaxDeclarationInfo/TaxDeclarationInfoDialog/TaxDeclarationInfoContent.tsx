import React from 'react'
import { Grid, Typography } from '@mui/material'
import useStyles from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfoDialog/common.style'

export const TaxDeclarationInfoContent = () => {
  const classes = useStyles()
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography align='left' className={classes.content}>
          Foreign Account Tax Compliance Act aims to collect information on
          United States (US) Tax residents using foreign accounts. It requires
          Financial Institutions outside the US to report customers who are US
          tax residents to the US tax authorities.
        </Typography>
      </Grid>
      <Grid marginTop={3}>
        <Typography align='left' className={classes.content}>
          InvestaX is collecting information regarding tax residency status of
          each Account holder in order to comply with Income Tax Act and
          Singapore Income Tax (International Tax Compliance Agreements)(Common
          Reporting Standard) Regulations 2016.
        </Typography>
      </Grid>
    </Grid>
  )
}
