import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, InputAdornment } from '@material-ui/core'
import { numericValueExtractor } from 'helpers/forms'
import { TypedField } from 'components/form/TypedField'
import { useStyles } from 'app/pages/exchange/components/PlaceOrderFields/PlaceOrderFields.style'
import { moneyNumberFormat, numberFormat } from 'config/numberFormat'
import { NumericInput } from 'components/form/NumericInput'
import { PlaceOrderSlider } from 'app/pages/exchange/components/PlaceOrderSlider/PlaceOrderSlider'

export interface PlaceOrderFieldsProps {
  balance: number
  totalCurrencyLabel: string
}

export const PlaceOrderFields: React.FC<PlaceOrderFieldsProps> = ({
  totalCurrencyLabel,
  balance
}) => {
  const classes = useStyles()
  const { control, setValue } = useFormContext()

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
          numberFormat={numberFormat}
          defaultValue={''}
          valueExtractor={numericValueExtractor}
          onChange={value => {
            setValue('amount', value)
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
        <PlaceOrderSlider balance={balance} />
      </Grid>

      <Grid item className={classes.inputGrid}>
        {/* @ts-expect-error */}
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
          defaultValue={null}
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
          disabled
        />
      </Grid>
    </Grid>
  )
}
