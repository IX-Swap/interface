import React from 'react'
import { Grid, InputAdornment } from '@material-ui/core'
import { moneyNumberFormat } from 'v2/app/components/DSO/utils'
import { useCommitmentForm } from 'v2/app/pages/invest/components/CommitmentForm'
import { useFormContext } from 'react-hook-form'
import { CommitmentFormValues } from 'v2/types/commitment'
import { DocumentNamePreview } from 'v2/app/pages/invest/components/DocumentNamePreview'

export interface CommitmentFormFieldsProps {
  symbol: string
}

export const CommitmentFormFields = (props: CommitmentFormFieldsProps) => {
  const { NumericField, TextField, DataroomDocument } = useCommitmentForm()
  const { watch } = useFormContext<CommitmentFormValues>()
  const { totalAmount, pricePerUnit } = watch(['totalAmount', 'pricePerUnit'])
  const getNumberOfUnits = () => {
    const numberOfUnits = totalAmount / pricePerUnit
    return Number.isNaN(numberOfUnits) ? undefined : numberOfUnits
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <DataroomDocument
          name='signedSubscriptionDocument'
          label='Subscription Document'
          canDelete={false}
          uploadComponent={<DocumentNamePreview />}
        />
      </Grid>

      <Grid item>
        <NumericField
          name='totalAmount'
          label='Investment Amount'
          numberFormat={moneyNumberFormat}
        />
      </Grid>

      <Grid item>
        <NumericField
          name='pricePerUnit'
          label='Unit Price'
          inputProps={{
            disabled: true,
            startAdornment: (
              <InputAdornment position='start'>{props.symbol}</InputAdornment>
            )
          }}
          numberFormat={{
            decimalScale: 2,
            inputMode: 'numeric',
            thousandSeparator: true,
            allowEmptyFormatting: true,
            isNumericString: true
          }}
        />
      </Grid>

      <Grid item>
        <NumericField
          name='numberOfUnits'
          label='Number of Units'
          valueProvider={getNumberOfUnits}
          inputProps={{
            disabled: true
          }}
          numberFormat={{
            decimalScale: 2,
            inputMode: 'numeric',
            allowEmptyFormatting: true,
            isNumericString: true
          }}
        />
      </Grid>

      <Grid item>
        <TextField name='walletAddress' label='Destination Wallet Address' />
      </Grid>

      <Grid item>
        <TextField name='otp' label='OTP' />
      </Grid>
    </Grid>
  )
}
