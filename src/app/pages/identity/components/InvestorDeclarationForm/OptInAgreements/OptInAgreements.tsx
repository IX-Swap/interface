import { OptOutInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'
import React, { Fragment } from 'react'
import { SafeguardInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoDialog'
import { Typography } from '@mui/material'
import useStyles from './OptInAgreements.style'

export interface OptInAgreementsProps {
  investorRole?: string
  showOptOutDialog?: boolean
}

export const OptInAgreements = ({
  investorRole = 'Accredited',
  showOptOutDialog = false
}: OptInAgreementsProps) => {
  const classes = useStyles()

  return (
    <Fragment>
      {/* <Typography className={classes.text}>
        I give my consent to IC SG Pte Ltd dba InvestaX to treat me as an “
        {investorRole} Investor”.{' '}
      </Typography> */}
      <Typography className={classes.text}>
        I have been informed of and understand the consequences of my
        qualification as an {investorRole} Investor, in particular the reduced
        regulatory investor <SafeguardInfoDialog /> for {investorRole}{' '}
        Investors.{' '}
      </Typography>
      {investorRole === 'Accredited' && (
        <Typography className={classes.text}>
          I have been informed of and understand my right to{' '}
          {showOptOutDialog ? (
            <OptOutInfoDialog investorRole={investorRole} />
          ) : (
            'opt out'
          )}{' '}
          of the {investorRole} Investor role with InvestaX at any point in
          time.
        </Typography>
      )}
    </Fragment>
  )
}

export const OptInAgreementsIndividual = ({
  investorRole = 'Accredited',
  showOptOutDialog = false
}: OptInAgreementsProps) => {
  return (
    <Typography fontWeight={400} lineHeight='160%' style={{ color: 'inherit' }}>
      I have been informed of and understand my right to{' '}
      {showOptOutDialog ? (
        <OptOutInfoDialog investorRole={investorRole} />
      ) : (
        'opt out'
      )}{' '}
      of the {investorRole} Investor role
    </Typography>
  )
}
