import { Box, Grid } from '@mui/material'
import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import { DepositInfoProps } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast'
import React from 'react'
import { AccountIdInstructions } from './AccountIdInstructions'

export const AchCredits = ({ accountId, currency }: DepositInfoProps) => {
  const achDetails = [
    {
      label: 'Currency',
      value: currency
    },
    {
      label: 'Bank:',
      value: 'Hongkong & Shanghai Banking Corporate (HSBC CORP)'
    },
    {
      label: 'Beneficiary Account Name / Payee:',
      value: 'IC SG Pte Ltd'
    },
    {
      label: 'Beneficiary Account Number:',
      value: accountId
    },
    {
      label: 'SWIFT Code:',
      value: 'HSBCSGSGXXX'
    }
  ]

  const extendedAchDetails = [
    ...achDetails,
    {
      label: 'Time Estimation for Deposit:',
      value: '1-3 Business Days'
    }
  ]

  return (
    <Grid direction='column'>
      <Grid item>
        <Box px={5} pb={5}>
          <Grid container spacing={5}>
            <CashDepositDetails data={extendedAchDetails} />
          </Grid>
        </Box>
      </Grid>
      <AccountIdInstructions />
    </Grid>
  )
}
