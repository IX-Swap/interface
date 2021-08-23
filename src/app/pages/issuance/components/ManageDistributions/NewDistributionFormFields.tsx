import { Box, Button, Grid, Typography } from '@material-ui/core'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { NumericFieldCapsule } from 'components/form/NumericFieldCapsule'
import { TypedField } from 'components/form/TypedField'
import { moneyNumberFormat } from 'config/numberFormat'
import { dateTimeValueExtractor, numericValueExtractor } from 'helpers/forms'
import { formatAmount } from 'helpers/numbers'
import { ValidCurrency } from 'helpers/types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { VSpacer } from 'components/VSpacer'
import { OTPDialog } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/OTPDialog'

export interface NewDistributionFormFieldsProps {
  currency: ValidCurrency
  showOtp: boolean
  showOTPForm: () => void
  closeOTPForm: () => void
}

export const NewDistributionFormFields = ({
  currency,
  showOtp,
  showOTPForm,
  closeOTPForm
}: NewDistributionFormFieldsProps) => {
  const { control, watch } = useFormContext()
  const pricePerToken = watch('pricePerToken')
  const totalDistributions = 5

  const totalDistributionAmount = `${currency} ${formatAmount(
    pricePerToken * totalDistributions
  )}`

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography variant='subtitle1'>
            Distribution Amount Per Token
          </Typography>
          <VSpacer size='small' />
          <TypedField
            control={control}
            component={NumericFieldCapsule}
            label='Price Per Token'
            name='pricePerToken'
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
            variant='outlined'
            capsuleLabel={currency}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant='subtitle1'>Schedule distribution</Typography>
          <VSpacer size='small' />
          {/* @ts-ignore */}
          <TypedField
            component={DateTimePicker}
            customRenderer
            label='Distribution Date'
            name='distributionDate'
            control={control}
            valueExtractor={dateTimeValueExtractor}
            defaultValue={null}
            inputVariant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} alignContent='center'>
            <Grid item>
              <Typography variant='subtitle1'>Total Distributions:</Typography>
            </Grid>
            <Grid item>
              <Typography variant='h5'>{totalDistributionAmount}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            type='button'
            onClick={showOTPForm}
            color='primary'
            variant='contained'
          >
            initiate distribution
          </Button>
        </Grid>
      </Grid>
      <OTPDialog
        open={showOtp}
        close={closeOTPForm}
        title='Confirm Your Distribution'
        content={
          <Box pb={2} textAlign='center'>
            {totalDistributionAmount} will be distributed to your investors.
          </Box>
        }
        actionLabel='Confirm'
      />
    </>
  )
}
