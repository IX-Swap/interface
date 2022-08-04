import { Box, Grid, Paper, Typography, useTheme } from '@mui/material'
import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import { DepositInfoProps } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast'
import { useStyles } from 'app/pages/accounts/components/VirtualAccountCashDeposit/shared.styles'
import React from 'react'

export const Tt = ({ accountId, currency }: DepositInfoProps) => {
  const theme = useTheme()
  const { footerInfo, paper } = useStyles()

  const ttDetails = [
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
      value: 'HSBCSGSG'
    },
    {
      label: 'Beneficiary’s Bank Address:',
      value: '48-01 10 MARINA BLVD, MARINA BAY FIN S(018983)'
    },
    {
      label: 'Time Estimation for Deposit:',
      value: '2-5 Business Days'
    }
  ]
  return (
    <Grid direction='column'>
      <Grid item>
        <Box px={5} pb={5}>
          <Grid container spacing={5}>
            <CashDepositDetails data={ttDetails} />
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Paper className={paper}>
          <Box className={footerInfo}>
            <Typography
              color={theme.palette.text.secondary}
              fontSize={14}
              fontWeight={400}
              lineHeight='22px'
              letterSpacing='-0.02em'
            >
              Please note that TT transfers are the only method of transfer from
              bank accounts that are not based in Singapore
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
