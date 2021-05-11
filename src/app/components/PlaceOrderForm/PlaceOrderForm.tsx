import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Grid,
  InputAdornment,
  Slider,
  Tab,
  Tabs,
  TextField
} from '@material-ui/core'
import { Submit } from 'components/form/Submit'
import { sliderValueExtractor } from 'helpers/forms'
import { TypedField } from 'components/form/TypedField'
import { LabelledValue } from 'components/LabelledValue'
import { OrderTypeSelect } from 'app/components/PlaceOrderForm/components/OrderTypeSelect'
import { TimeInForceSelect } from 'app/components/PlaceOrderForm/components/TimeInForceSelect'
import { useStyles } from './PlaceOrderForm.style'

export const PlaceOrderForm = () => {
  const classes = useStyles()
  const { control } = useFormContext()
  const [selectedIdx, setSelectedIdx] = useState(0)

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
          <LabelledValue value={'SGD 15,000.00'} label='Balance:' />
        </Grid>

        <Grid item>
          <LabelledValue value={'IXPS 300.00'} label='' />
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
            component={TextField}
            name={'price'}
            label={'Price'}
            control={control}
            variant='outlined'
          />
        </Grid>

        <Grid item className={classes.inputGrid}>
          <TypedField
            component={TextField}
            name={'amount'}
            label={'Amount'}
            control={control}
            variant='outlined'
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
          <TypedField
            fullWidth
            customRenderer
            component={TextField}
            name={'orderType'}
            label={''}
            control={control}
            variant='outlined'
            inputProps={{ style: { textAlign: 'end' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>SGD</InputAdornment>
              )
            }}
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
