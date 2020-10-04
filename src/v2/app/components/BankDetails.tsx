import React from 'react'
import { Paper, Box, Typography, Grid } from '@material-ui/core'
import { Bank } from 'v2/types/bank'
import { LabelledValue } from '../../components/LabelledValue'
import { convertAddressToString } from '../pages/authorizer/components/utils'

interface BankDetailsProps {
  bank: Partial<Bank>
  code?: string
}

export const BankDetails = ({ bank }: BankDetailsProps) => (
  <Paper>
    <Box px={4} py={2}>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='subtitle2'>{bank.bankName}</Typography>
        </Grid>
        <LabelledValue
          label='Swift'
          value={bank.swiftCode}
          labelWeight='thin'
          row
        />
        <LabelledValue
          label='Bank Address'
          value={convertAddressToString(bank.address)}
          labelWeight='thin'
          row
        />
        <LabelledValue
          label={'Account'}
          value={bank.accountHolderName}
          labelWeight='thin'
          row
        />
        <LabelledValue
          label={'Account Number'}
          value={bank.bankAccountNumber}
          labelWeight='thin'
          row
        />
      </Grid>
    </Box>
  </Paper>
)
