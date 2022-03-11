import React from 'react'
import { Grid } from '@mui/material'
import { Bank } from 'types/bank'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'
import { LabelledValue } from 'components/LabelledValue'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { privateClassNames } from 'helpers/classnames'

export interface BankViewProps {
  data: Bank
}

export const BankPreview: React.FC<BankViewProps> = ({ data }) => {
  useSetPageTitle(data?.bankName)

  if (data === null) {
    return null
  }

  return (
    <Grid container spacing={3}>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue label='Bank Name' value={data.bankName} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Account Holder Name'
            value={data.accountHolderName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue label='Currency' value={data.currency.symbol} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            className={privateClassNames()}
            label='Bank Account Number'
            value={data.bankAccountNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            className={privateClassNames()}
            label='Swift Code'
            value={data.swiftCode}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Bank Address'
            value={convertAddressToString(data.address)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} />
    </Grid>
  )
}
