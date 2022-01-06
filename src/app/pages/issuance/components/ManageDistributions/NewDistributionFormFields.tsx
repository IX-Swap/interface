import { Box, Button, Grid, Paper, Typography } from '@material-ui/core'
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
import { useParams } from 'react-router-dom'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useBalancesByType } from 'hooks/balance/useBalancesByType'

export interface NewDistributionFormFieldsProps {
  currency: ValidCurrency
  showOtp: boolean
  showOTPForm: () => void
  closeOTPForm: () => void
  disabled?: boolean
}

export const NewDistributionFormFields = ({
  currency,
  showOtp,
  showOTPForm,
  closeOTPForm,
  disabled = false
}: NewDistributionFormFieldsProps) => {
  const { control, watch } = useFormContext()
  const pricePerToken = watch('amountPerToken')
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isLoading } = useDSOById(dsoId, issuerId)
  const { data: assetData, isLoading: assetIsLoading } =
    useBalancesByType('Currency')

  if (isLoading || assetIsLoading) {
    return null
  }

  let totalTokens = 0
  let isEnough = true

  if (data !== undefined && assetData !== undefined) {
    totalTokens = (data.insight?.raisedTotal ?? 0) / data.pricePerUnit
  }

  const totalDistributionAmount = `${currency} ${formatAmount(
    pricePerToken * totalTokens
  )}`

  const asset = assetData.map[data?.currency.symbol ?? '']
  if (pricePerToken * totalTokens >= asset.available) {
    isEnough = false
  }

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
            name='amountPerToken'
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
            variant='outlined'
            capsuleLabel={currency}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant='subtitle1'>Schedule distribution</Typography>
          <VSpacer size='small' />
          <TypedField
            component={DateTimePicker}
            customRenderer
            label='Distribution Date'
            name='distributionDate'
            control={control}
            valueExtractor={dateTimeValueExtractor}
            defaultValue={null}
            inputVariant='outlined'
            minDate={new Date()}
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
        {!isEnough && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              elevation={0}
              style={{
                backgroundColor: '#FFF5F5',
                borderLeft: '4px solid #F33E3E',
                padding: '8px 16px'
              }}
            >
              <Typography variant='caption' color='error'>
                Distribution will not be complete because of insufficient
                balance. Please fund your account.
              </Typography>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type='button'
            onClick={showOTPForm}
            color='primary'
            variant='contained'
            disabled={disabled || !isEnough}
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
