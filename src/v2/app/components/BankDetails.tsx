import React from 'react'
import { Typography, Grid, CardContent, Card } from '@material-ui/core'
import { Bank } from 'v2/types/bank'
import { LabelledValue } from 'v2/components/LabelledValue'
import { convertAddressToString } from 'v2/app/pages/authorizer/components/utils'

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
          <LabelledValue label='Swift' value={bank.swiftCode} row />
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
