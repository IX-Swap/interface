import {
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
  Box
} from '@mui/material'
import { useWithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { UploadSignedSubscriptionDocument } from 'components/dataroom/UploadSignedSubscriptionDocument'
import { Checkbox } from 'components/form/Checkbox'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { WithdrawalAddressSelect } from 'components/form/WithdrawalAddressSelect'
import { ETHEREUM_DECIMAL_PLACES } from 'config'
import { moneyNumberFormat } from 'config/numberFormat'
import { privateClassNames } from 'helpers/classnames'
import {
  booleanValueExtractor,
  numericValueExtractor,
  plainValueExtractor
} from 'helpers/forms'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { CommitmentFormValues } from 'types/commitment'
import { AddMetamaskWallet } from './AddMetamaskWallet'

export interface CommitmentFormFieldsProps {
  symbol: string
  network?: string
  decimalScale?: number
  isCampaign?: boolean
}

export const CommitmentFormFields = (props: CommitmentFormFieldsProps) => {
  const { control, setValue } = useFormContext<CommitmentFormValues>()
  const handleNumOfUnitsChange = (value: number, path: string) => {
    const { pricePerUnit } = control.getValues()
    const nextValue = value * (pricePerUnit ?? 1)

    control.setValue(path, value, { shouldValidate: true })
    control.setValue('totalAmount', nextValue)
  }

  const decimalScale = props.decimalScale ?? ETHEREUM_DECIMAL_PLACES

  const { data, status } = useWithdrawalAddresses({})
  const filteredAddresses = data.list.filter(
    ({ status }) => status === 'Approved'
  )
  const hasFilteredAddresses = filteredAddresses.length > 0
  const { isCampaign = false } = props
  useEffect(() => {
    if (isCampaign) {
      setValue('numberOfUnits', 1)
    }
  }, [isCampaign, setValue])
  return (
    <Grid container direction='column' spacing={2}>
      {!isCampaign && (
        <Grid item>
          <TypedField
            customRenderer
            control={control}
            component={DataroomUploader}
            name='signedSubscriptionDocument'
            label='Subscription Document'
            render={UploadSignedSubscriptionDocument}
            valueExtractor={plainValueExtractor}
            documentInfo={{
              title: 'Signed Subscription Document',
              type: 'Signed Subscription Document'
            }}
          />
        </Grid>
      )}

      <Grid item>
        <TypedField
          component={NumericInput}
          control={control}
          name='numberOfUnits'
          disabled={isCampaign}
          label='Number of Units'
          numberFormat={{ ...moneyNumberFormat, decimalScale }}
          valueExtractor={numericValueExtractor}
          onChange={handleNumOfUnitsChange}
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
          name='totalAmount'
          label='Investment Amount'
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
        />
      </Grid>

      <Grid item>
        <TypedField
          className={privateClassNames()}
          component={WithdrawalAddressSelect}
          control={control}
          name='withdrawalAddress'
          label={
            !hasFilteredAddresses && status !== 'loading'
              ? 'You do not have wallet addresses'
              : 'Destination Wallet Address'
          }
          disabled={!hasFilteredAddresses}
          displayEmpty
          list={filteredAddresses}
          status={status}
        />
      </Grid>

      <Grid item>
        <AddMetamaskWallet />
      </Grid>

      <Grid item>
        <Typography variant='subtitle1'>OTP</Typography>
        <Box py={0.4} />
        <TypedField
          className={privateClassNames()}
          component={OutlinedInput}
          control={control}
          name='otp'
          autoComplete='off'
          placeholder='OTP'
        />
      </Grid>
      {isCampaign && (
        <Grid item>
          <TypedField
            customRenderer
            valueExtractor={booleanValueExtractor}
            component={Checkbox}
            control={control}
            label='I have read, fully understand the contents and agree to be bound by the Terms of Investment Agreement.'
            name='tnc'
            style={{ marginRight: 0 }}
          />
        </Grid>
      )}
    </Grid>
  )
}
