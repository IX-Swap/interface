import { Box, Grid } from '@material-ui/core'
import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import React from 'react'

const achDetails = [
  {
    label: 'Currency',
    value: 'SGD'
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
    value: '123456789012'
  },
  {
    label: 'SWIFT Code:',
    value: 'HSBCSGSGXXX'
  },
  {
    label: 'My Initials:',
    value: 'Indicate InvestaX Client Name/ID'
  },
  {
    label: 'Message to receiver/beneficiary/Ref/Bill ref:',
    value: 'InvestaX to recommend'
  }
]

export const AchCredits = () => {
  return (
    <Grid direction='column'>
      <Grid item>
        <Box px={3} pb={3}>
          <Grid container spacing={1}>
            <CashDepositDetails data={achDetails} />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
