import { Box, Grid, Link, Typography } from '@material-ui/core'
import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import { useStyles } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast.styles'
import React from 'react'

const fastDetails = [
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

export const Fast = () => {
  const { footerInfo } = useStyles()
  return (
    <Grid direction='column'>
      <Grid item>
        <Box px={3} pb={3}>
          <Grid container spacing={1}>
            <CashDepositDetails data={fastDetails} />
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={footerInfo}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Box fontWeight='bold'>Max Transaction Limit:</Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>SGD 200,000</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box fontStyle='italic'>
                Please visit the link below to know more about the list of banks
                that supports FAST
              </Box>
              <Link
                href='https://www.abs.org.sg/consumer-banking/fast'
                target='_blank'
              >
                https://www.abs.org.sg/consumer-banking/fast
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
