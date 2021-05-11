import { Box, Grid } from '@material-ui/core'
import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import React from 'react'

const mepsDetails = [
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
    value: 'HSBCSGSG'
  },
  {
    label: 'Message to receiver/beneficiary/Ref/Bill ref:',
    value: 'InvestaX to recommend'
  }
]

export const Meps = () => {
  return (
    <Grid direction='column'>
      <Grid item>
        <Box px={3} pb={3}>
          <Grid container spacing={1}>
            <CashDepositDetails data={mepsDetails} />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
