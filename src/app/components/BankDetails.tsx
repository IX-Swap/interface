import React from 'react'
import { Typography, Grid, CardContent, Card } from '@mui/material'
import { Bank } from 'types/bank'
import { LabelledValue } from 'components/LabelledValue'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'

interface BankDetailsProps {
  bank: Partial<Bank>
  code?: string
}

export const BankDetails = (props: BankDetailsProps) => {
  const { bank } = props

  return (
    <Card variant='outlined'>
      <CardContent>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Typography variant='subtitle2'>{bank.bankName}</Typography>
          </Grid>
          <LabelledValue label='SWIFT Code' value={bank.swiftCode} row />
          <LabelledValue
            label='Bank Address'
            value={convertAddressToString(bank.address)}
            row
          />
          <LabelledValue label={'Account'} value={bank.accountHolderName} row />
          <LabelledValue
            label={'Account Number'}
            value={bank.bankAccountNumber}
            row
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
