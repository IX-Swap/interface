import { Typography } from '@mui/material'
import { SafeguardInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoDialog'
import React from 'react'

export const SafeguardAgreements = ({
  investorRole = 'Accredited'
}: {
  investorRole?: string
}) => {
  return (
    <Typography fontWeight={400} lineHeight='160%' style={{ color: 'inherit' }}>
      I have been informed of and understand the consequences of my
      qualification as an {investorRole} Investor, in particular the reduced
      regulatory investor <SafeguardInfoDialog /> for {investorRole} Investors.
    </Typography>
  )
}
