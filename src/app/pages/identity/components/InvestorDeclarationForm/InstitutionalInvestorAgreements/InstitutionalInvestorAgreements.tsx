import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import useStyles from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorAgreements/InstitutionalInvestorAgreements.styles'
import { InstitutionalInvestorInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorInfoDialog/InstitutianalInvestorInfoDialog'

export const InstitutionalInvestorAgreements = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <Typography className={classes.container}>
        I declare I am an Institutional Investor{' '}
        <InstitutionalInvestorInfoDialog />
      </Typography>
    </Fragment>
  )
}
