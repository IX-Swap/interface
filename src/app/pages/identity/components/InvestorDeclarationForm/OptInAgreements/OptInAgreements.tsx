import React from 'react'
import { OptOutInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'
import { Typography } from '@mui/material'

export interface OptInAgreementsProps {
  investorRole?: string
  showOptOutDialog?: boolean
}

export const OptInAgreements = ({
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
