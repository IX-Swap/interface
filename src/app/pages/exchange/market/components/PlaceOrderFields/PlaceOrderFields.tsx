import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, InputAdornment, Slider } from '@material-ui/core'
import { numericValueExtractor } from 'helpers/forms'
import { TypedField } from 'components/form/TypedField'
import { useStyles } from 'app/pages/exchange/market/components/PlaceOrderFields/PlaceOrderFields.style'
import { moneyNumberFormat, numberFormat } from 'config/numberFormat'
import { NumericInput } from 'components/form/NumericInput'

export interface PlaceOrderFieldsProps {
  currencyLabel: string
  tokenLabel: string
  currencyBalance: number
  tokenBalance: number
  side: 'BUY' | 'SELL'
}

export const PlaceOrderFields: React.FC<PlaceOrderFieldsProps> = ({
  currencyLabel,
  tokenLabel,
  currencyBalance,
  tokenBalance,
  side
}) => {
  const classes = useStyles()
  const { control, setValue, watch } = useFormContext()

  const price = watch('price')
  const amount = watch('amount')
  const [slider, setSlider] = useState(0)
  const balance = side === 'BUY' ? currencyBalance : tokenBalance

  useEffect(() => {
    if (price !== undefined && amount !== undefined) {
      const totalValue = price * amount
      setValue('total', totalValue)
      const newSliderValue = (100 / balance) * totalValue * (4 / 100)
      setSlider(newSliderValue)
    } else {
      setValue('total', 0)
      setSlider(0)
    }
  }, [amount, price, balance]) // eslint-disable-line

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
        />
      </Grid>

      <Grid item className={classes.inputGrid}>
        <TypedField
          component={NumericInput}
          name={'amount'}
          label={'Amount'}
          control={control}
          variant='outlined'
          numberFormat={numberFormat}
          valueExtractor={numericValueExtractor}
        />
      </Grid>

      <Grid item className={classes.sliderWrapper}>
        <Slider
          value={slider}
          min={0}
          max={4}
          marks
          classes={{
            rail: classes.rail,
            track: classes.track,
            thumb: classes.thumb,
            mark: classes.mark,
            markActive: classes.markActive
          }}
          disabled={price === null || price === undefined}
          onChange={(evt, value) => {
            setSlider(value as number)
            const newAmount = ((balance / 4) * (value as number)) / price
            setValue('amount', newAmount)
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
          startAdornment={
            <InputAdornment position='start'>
              {side === 'BUY' ? currencyLabel : tokenLabel}
            </InputAdornment>
          }
          numberFormat={moneyNumberFormat}
          valueExtractor={numericValueExtractor}
          disabled
        />
      </Grid>
    </Grid>
  )
}
