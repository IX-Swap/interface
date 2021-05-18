import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, InputAdornment, Slider } from '@material-ui/core'
import { numericValueExtractor, sliderValueExtractor } from 'helpers/forms'
import { TypedField } from 'components/form/TypedField'
import { OrderTypeSelect } from 'app/exchange/market/components/PlaceOrderFields/OrderTypeSelect'
import { TimeInForceSelect } from 'app/exchange/market/components/PlaceOrderFields/TimeInForceSelect'
import { useStyles } from 'app/exchange/market/components/PlaceOrderFields/PlaceOrderFields.style'
import { moneyNumberFormat } from 'config/numberFormat'
import { NumericInput } from 'components/form/NumericInput'

export const PlaceOrderFields = () => {
  const classes = useStyles()
  const { control, setValue, watch } = useFormContext()
  const price = watch('price')
  const amount = watch('amount')

  if (price !== undefined && amount !== undefined) {
    setValue('total', price * amount)
  } else {
    setValue('total', 0)
  }

  return (
    <Grid item container direction={'column'} className={classes.container}>
      <Grid item className={classes.inputGrid}>
        <TypedField
          component={OrderTypeSelect}
          label='Order Type'
          name='type'
          control={control}
          variant='outlined'
        />
      </Grid>

      <Grid item className={classes.inputGrid}>
        <TypedField
          component={TimeInForceSelect}
          label='Time-In-Force'
          name='timeInForce'
          control={control}
          variant='outlined'
        />
      </Grid>

      <Grid item className={classes.inputGrid}>
        <TypedField
          component={NumericInput}
          name={'price'}
          label={'Price'}
          control={control}
          variant='outlined'
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
        />
      </Grid>

      <Grid item className={classes.inputGrid}>
        <TypedField
          component={NumericInput}
          name={'amount'}
          label={'Amount'}
          control={control}
          variant='outlined'
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
        />
      </Grid>

      <Grid item className={classes.sliderWrapper}>
        {/* @ts-ignore */}
        <TypedField
          valueExtractor={sliderValueExtractor}
          customRenderer
          component={Slider}
          name={'slider'}
          control={control}
          min={1}
          max={5}
          marks
          classes={{
            rail: classes.rail,
            track: classes.track,
            thumb: classes.thumb,
            mark: classes.mark,
            markActive: classes.markActive
          }}
        />
      </Grid>

      <Grid item className={classes.inputGrid}>
        {/* @ts-ignore */}
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
          startAdornment={<InputAdornment position='start'>SGD</InputAdornment>}
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
          disabled
        />
      </Grid>
    </Grid>
  )
}
