import { Box, Grid, Typography } from '@mui/material'
import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import { DepositInfoProps } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast'
import React from 'react'
import { useStyles } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast.styles'

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
  const { infoMessage } = useStyles()

  return (
    <Grid direction='column'>
      <Grid item>
        <Box px={3} pb={3}>
          <Grid item>
            <Typography className={infoMessage}>
              Bank charges may apply and will be borne by the clients
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <CashDepositDetails data={extendedAchDetails} />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
