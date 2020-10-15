import React from 'react'
import { Grid } from '@material-ui/core'
import { Bank } from 'v2/types/bank'
import { convertAddressToString } from 'v2/app/pages/authorizer/components/utils'
import { LabelledValue } from 'v2/components/LabelledValue'
import { SupportingDocuments } from 'v2/app/components/SupportingDocuments'

export interface BankViewProps {
  data: Bank
}

export const BankPreview: React.FC<BankViewProps> = ({ data }) => {
  if (data === null) {
    return null
  }

  return (
    <Grid container spacing={4}>
      <Grid item container spacing={4}>
        <Grid item xs={4}>
          <LabelledValue label='Bank Name' value={data.bankName} />
        </Grid>
        <Grid item xs={4}>
          <LabelledValue
            label='Account Holder Name'
            value={data.accountHolderName}
          />
        </Grid>
        <Grid item xs={4}>
          <LabelledValue label='Currency' value={data.currency.symbol} />
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item xs={4}>
          <LabelledValue
            label='Bank Account Number'
            value={data.bankAccountNumber}
          />
        </Grid>
        <Grid item xs={4}>
          <LabelledValue label='Swift Code' value={data.swiftCode} />
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item xs={5}>
          <LabelledValue
            label='Bank Address'
            value={convertAddressToString(data.address)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={12}>
        <SupportingDocuments data={data.supportingDocuments} />
      </Grid>
    </Grid>
  )
}
