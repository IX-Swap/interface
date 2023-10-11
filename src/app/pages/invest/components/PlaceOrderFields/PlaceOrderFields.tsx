import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, InputAdornment } from '@mui/material'
import { numericValueExtractor } from 'helpers/forms'
import { TypedField } from 'components/form/TypedField'
import { useStyles } from 'app/pages/invest/components/PlaceOrderFields/PlaceOrderFields.style'
import {
  moneyNumberFormat,
  // numberFormat,
  quantityNumberFormat
} from 'config/numberFormat'
import { NumericInput } from 'components/form/NumericInput'
import { PlaceOrderSlider } from 'app/pages/invest/components/PlaceOrderSlider/PlaceOrderSlider'
// import { useOTCMarket } from 'app/pages/invest/hooks/useOTCMarket'
// import { useParams } from 'react-router-dom'

export interface PlaceOrderFieldsProps {
  balance: number
  totalCurrencyLabel: string
  activeTab: number
}

export const PlaceOrderFields: React.FC<PlaceOrderFieldsProps> = ({
  totalCurrencyLabel,
  balance,
  activeTab
}) => {
  const classes = useStyles()
  const { control, setValue } = useFormContext()

  //   const { pairId } = useParams<{
  //     pairId: string
  //   }>()

  //   const { data } = useOTCMarket(pairId)
  //   const decimalPlaces = data?.otc?.dso?.decimalPlaces ?? 0

  // TODO Uncomment after testing
  // const price = watch('price')
  // const amount = watch('amount')

  return (
    <Grid item container direction={'column'} className={classes.container}>
      <Grid item className={classes.inputGrid}>
        <TypedField
          component={NumericInput}
          name={'price'}
          label={'Price'}
          control={control}
          variant='outlined'
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
          defaultValue={''}
          onChange={value => {
            setValue('price', value)
            if (value === undefined) {
              setValue('total', 0)
            }
            // TODO Uncomment after testing
            // if (amount * value > balance) {
            //   setError('price', { message: 'Insufficient balance' })
            // } else {
            //   clearErrors()
            // }
          }}
        />
      </Grid>

      <Grid item className={classes.inputGrid}>
        <TypedField
          component={NumericInput}
          name={'amount'}
          label={'Quantity'}
          control={control}
          variant='outlined'
          //   numberFormat={numberFormat}
          numberFormat={{
            // decimalScale: decimalPlaces < 4 ? decimalPlaces : 4,
            decimalScale: 2,
            ...quantityNumberFormat
          }}
          defaultValue={''}
          valueExtractor={numericValueExtractor}
          onChange={value => {
            setValue('amount', value)
            if (value === undefined) {
              setValue('total', 0)
            }
            // TODO Uncomment after testing
            // if (price * value > balance) {
            //   setError('amount', { message: 'Insufficient balance' })
            // } else {
            //   clearErrors()
            // }
          }}
        />
      </Grid>

      <Grid item className={classes.sliderWrapper}>
        <PlaceOrderSlider balance={balance} activeTab={activeTab} />
      </Grid>

      <Grid item className={classes.inputGrid}>
        <TypedField
          fullWidth
          customRenderer
          component={NumericInput}
          name={'total'}
          control={control}
          variant='outlined'
          classes={{
            input: classes.input
          }}
          startAdornment={
            <InputAdornment position='start'>
              {totalCurrencyLabel}
            </InputAdornment>
          }
          defaultValue={0}
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
          disabled
        />
      </Grid>
    </Grid>
  )
}
