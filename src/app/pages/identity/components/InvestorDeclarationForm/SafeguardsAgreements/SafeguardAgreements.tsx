import { Typography } from '@mui/material'
import { SafeguardInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoDialog'
import React from 'react'

export const SafeguardAgreements = () => {
  return (
    <Typography fontWeight={400} lineHeight='160%'>
      I have been informed of and understand the consequences of my
      qualification as an Accredited Investor, in particular the reduced
      regulatory investor <SafeguardInfoDialog /> for Accredited Investors.
    </Typography>
  )
}
