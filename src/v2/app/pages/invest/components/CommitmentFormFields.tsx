import React from 'react'
import { Grid, Input, InputAdornment } from '@material-ui/core'
import { moneyNumberFormat } from 'v2/config/numberFormat'
import { useFormContext } from 'react-hook-form'
import { CommitmentFormValues } from 'v2/types/commitment'
import { TypedField } from 'v2/components/form/TypedField'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { NumericInput } from 'v2/components/form/NumericInput'
import { numericValueExtractor, plainValueExtractor } from 'v2/helpers/forms'
import { UploadButton } from 'v2/components/dataroom/UploadButton'

export interface CommitmentFormFieldsProps {
  symbol: string
}

export const CommitmentFormFields = (props: CommitmentFormFieldsProps) => {
  const { control } = useFormContext<CommitmentFormValues>()
  const handleTotalAmountChange = (value: number, path: string) => {
    const { pricePerUnit } = control.getValues()
    const nextValue = (value * 100) / pricePerUnit

    control.setValue(path, value, { shouldValidate: true })
    control.setValue('numberOfUnits', nextValue / 100)
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          control={control}
          component={DataroomUploader}
          name='signedSubscriptionDocument'
          label='Subscription Document'
          render={UploadButton}
          valueExtractor={plainValueExtractor}
          documentInfo={{
            title: 'Signed Subscription Document',
            type: 'Signed Subscription Document'
          }}
        />
      </Grid>

      <Grid item>
        <TypedField
          component={NumericInput}
          control={control}
          name='totalAmount'
          label='Investment Amount'
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
          onChange={handleTotalAmountChange}
        />
      </Grid>

      <Grid item>
        <TypedField
          disabled
          component={NumericInput}
          control={control}
          name='pricePerUnit'
          label='Unit Price'
          valueExtractor={numericValueExtractor}
          numberFormat={moneyNumberFormat}
          startAdornment={
            <InputAdornment position='start'>{props.symbol}</InputAdornment>
          }
        />
      </Grid>

      <Grid item>
        <TypedField
          disabled
          component={NumericInput}
          control={control}
          name='numberOfUnits'
          label='Number of Units'
          numberFormat={{ ...moneyNumberFormat, decimalScale: 10 }}
          valueExtractor={numericValueExtractor}
        />
      </Grid>

      <Grid item>
        <TypedField
          component={Input}
          control={control}
          name='walletAddress'
          label='Destination Wallet Address'
        />
      </Grid>

      <Grid item>
        <TypedField
          component={Input}
          control={control}
          name='otp'
          label='OTP'
        />
      </Grid>
    </Grid>
  )
}
