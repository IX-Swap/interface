import { Box, Grid, Link, Typography, useTheme } from '@mui/material'
import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import { useStyles } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast.styles'
import { ValidCurrency } from 'helpers/types'
import React from 'react'

export interface DepositInfoProps {
  accountId: string
  currency: ValidCurrency
}

export const Fast = ({ accountId, currency }: DepositInfoProps) => {
  const theme = useTheme()
  const { footerInfo, infoMessage } = useStyles()
  const fastDetails = [
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

  const extendedFastDetails = [
    ...fastDetails,
    {
      label: 'Time Estimation for Deposit:',
      value: '1 Hour'
    }
  ]

  return (
    <Grid direction='column'>
      <Grid item>
        <Box px={3} pb={3}>
          <Grid item>
            <Typography className={infoMessage}>
              Bank charges may apply and will be borne by the clients
            </Typography>
          </Grid>
          <Grid container spacing={5}>
            <CashDepositDetails data={extendedFastDetails} />
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={footerInfo}>
          <Typography
            color={theme.palette.text.secondary}
            fontSize={14}
            fontWeight={400}
            lineHeight='22px'
            letterSpacing='-0.02em'
          >
            Max Transaction Limit: SGD 200,000. Please visit the link below to
            know more about the list of banks that supports FAST <br />
            <Link
              href='https://www.abs.org.sg/consumer-banking/fast'
              target='_blank'
            >
              https://www.abs.org.sg/consumer-banking/fast
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
