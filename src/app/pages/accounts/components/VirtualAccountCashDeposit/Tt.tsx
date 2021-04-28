import { Box, Grid } from '@material-ui/core'
import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import React from 'react'

const ttDetails = [
  {
    label: 'Currency',
    value: 'USD'
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
    label: 'Beneficiary’s Bank Address:',
    value: '48-01 10 MARINA BLVD, MARINA BAY FIN S(018983)'
  },
  {
    label: 'Message to receiver/beneficiary/Ref/Bill ref:',
    value: 'InvestaX to recommend'
  }
]

export const Tt = () => {
  return (
    <Grid direction='column'>
      <Grid item>
        <Box px={3} pb={3}>
          <Grid container spacing={1}>
            <CashDepositDetails data={ttDetails} />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
