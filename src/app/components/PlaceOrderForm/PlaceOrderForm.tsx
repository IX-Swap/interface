import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, InputAdornment, Slider, Tab, Tabs } from '@material-ui/core'
import { Submit } from 'components/form/Submit'
import { numericValueExtractor, sliderValueExtractor } from 'helpers/forms'
import { TypedField } from 'components/form/TypedField'
import { LabelledValue } from 'components/LabelledValue'
import { OrderTypeSelect } from 'app/components/PlaceOrderForm/components/OrderTypeSelect'
import { TimeInForceSelect } from 'app/components/PlaceOrderForm/components/TimeInForceSelect'
import { useStyles } from './PlaceOrderForm.style'
import { formatMoney } from 'helpers/numbers'
import { moneyNumberFormat } from 'config/numberFormat'
import { NumericInput } from 'components/form/NumericInput'

export const PlaceOrderForm = () => {
  const classes = useStyles()
  const { control, setValue, watch } = useFormContext()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const price = watch('price')
  const amount = watch('amount')

  if (price !== undefined && amount !== undefined) {
    setValue('total', price * amount)
  } else {
    setValue('total', 0)
  }

  return (
    <Grid
      xs={12}
      md={3}
      container
      direction={'column'}
      className={classes.container}
    >
      <Grid item>
        <Tabs
          value={selectedIdx}
          onChange={(_, index) => setSelectedIdx(index)}
          classes={{
            indicator: classes.indicator
          }}
          TabIndicatorProps={{ children: <span /> }}
          centered
          variant={'fullWidth'}
        >
          <Tab
            label='BUY'
            classes={{
              root: classes.tab
            }}
          />
          <Tab
            label='SELL'
            classes={{
              root: classes.tab
            }}
          />
        </Tabs>
      </Grid>

      <Grid
        item
        container
        alignItems={'flex-end'}
        justify={'space-between'}
        className={classes.balanceWrapper}
      >
        <Grid item>
          <LabelledValue value={formatMoney(15000)} label='Balance:' />
        </Grid>

        <Grid item>
          <LabelledValue value={formatMoney(300, 'IXPS')} label='' />
        </Grid>
      </Grid>
      <Grid item container direction={'column'} className={classes.formWrapper}>
        <Grid item className={classes.inputGrid}>
          <TypedField
            component={OrderTypeSelect}
            label='Order Type'
            name='orderType'
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
            startAdornment={
              <InputAdornment position='start'>SGD</InputAdornment>
            }
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
            disabled
          />
        </Grid>

        <Grid item>
          <Submit
            data-testid='submit'
            size='large'
            variant='contained'
            disabled={false}
            className={classes.button}
          >
            PLACE ORDER
          </Submit>
        </Grid>
      </Grid>
    </Grid>
  )
}
