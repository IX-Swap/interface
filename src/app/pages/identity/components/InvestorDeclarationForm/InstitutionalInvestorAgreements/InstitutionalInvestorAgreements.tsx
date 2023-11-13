import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import useStyles from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorAgreements/InstitutionalInvestorAgreements.styles'
import { InstitutionalInvestorInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorInfoDialog/InstitutionalInvestorInfoDialog'
import { IntermediaryInvestorInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/IntermediaryInvestorInfoDialog/IntermediaryInvestorInfoDialog'
import { ExchangeAgreements } from '../ExchangeAgreements/ExchangeAgreements'

const InstitutionalInvestorAgreements = ({ type }: { type: string }) => {
  const classes = useStyles()

  return (
    <Fragment>
      <Typography className={classes.container}>
        I declare I am an{' '}
        {type === 'Institutional' ? (
          <InstitutionalInvestorInfoDialog />
        ) : (
          <IntermediaryInvestorInfoDialog />
        )}
      </Typography>
    </Fragment>
  )
}

export const institutionalInvestorAgreements = [
  {
    name: 'isInstitutionalInvestor',
    label: <InstitutionalInvestorAgreements type='Institutional' />
  },
  {
    name: 'isIntermediaryInvestor',
    label: <InstitutionalInvestorAgreements type='Intermediary' />
  },
  {
    name: 'optInAgreementsExchange',
    label: <ExchangeAgreements investorRole='Institutional' />
  }
]

export const institutionalInvestorAgreementsMap = {
  isInstitutionalInvestor: (
    <InstitutionalInvestorAgreements type='Institutional' />
  ),
  isIntermediaryInvestor: (
    <InstitutionalInvestorAgreements type='Intermediary' />
  ),
  optInAgreementsExchange: <ExchangeAgreements investorRole='Institutional' />
}
