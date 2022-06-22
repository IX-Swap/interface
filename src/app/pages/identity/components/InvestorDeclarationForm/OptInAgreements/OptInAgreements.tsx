import { OptOutInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'
import React, { Fragment } from 'react'
import { SafeguardInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoDialog'
import { Typography } from '@mui/material'
import useStyles from './OptInAgreements.style'

export interface OptInAgreementsProps {
  showOptOutDialog?: boolean
}

export const OptInAgreements = ({
  showOptOutDialog = false
}: OptInAgreementsProps) => {
  const classes = useStyles()

  return (
    <Fragment>
      <Typography textTransform={'capitalize'} className={classes.text}>
        I give my consent to IC SG Pte Ltd dba InvestaX to treat me as an
        “Accredited Investor”.{' '}
      </Typography>
      <Typography textTransform={'capitalize'} className={classes.text}>
        I have been informed of and understand the consequences of my
        qualification as an Accredited Investor, in particular the reduced
        regulatory investor <SafeguardInfoDialog /> for Accredited Investors.{' '}
      </Typography>
      <Typography textTransform={'capitalize'} className={classes.text}>
        I have been informed of and understand my right to{' '}
        {showOptOutDialog ? <OptOutInfoDialog /> : 'opt out'} of the Accredited
        Investors status with InvestaX at any point in time.
      </Typography>
    </Fragment>
  )
}

export const OptInAgreementsIndividual = ({
  showOptOutDialog = false
}: OptInAgreementsProps) => {
  return (
    <Fragment>
      I have been informed of and understand my right to{' '}
      {showOptOutDialog ? <OptOutInfoDialog /> : 'opt out'} of the Accredited
      Investors status
    </Fragment>
  )
}
