import { Typography } from '@mui/material'
import React from 'react'

export const ExchangeAgreements = ({
  investorRole = 'Accredited'
}: {
  investorRole?: string
}) => {
  return (
    <Typography fontWeight={400} lineHeight='160%' style={{ color: 'inherit' }}>
      I understand that as an {investorRole} Investor, I will be allowed to
      execute trades on the IX Exchange, which is a recognised market operator
      and is subject to less stringent regulations than an approved exchange.
    </Typography>
  )
}
