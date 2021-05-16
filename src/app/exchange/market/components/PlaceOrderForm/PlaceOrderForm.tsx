import React, { useState } from 'react'
import { Grid, Tab, Tabs } from '@material-ui/core'
import { Submit } from 'components/form/Submit'
import { LabelledValue } from 'components/LabelledValue'
import { useStyles } from 'app/exchange/market/components/PlaceOrderForm/PlaceOrderForm.style'
import { formatMoney } from 'helpers/numbers'
import { PlaceOrderFields } from 'app/exchange/market/components/PlaceOrderFields/PlaceOrderFields'
import { Form } from 'components/form/Form'
import {
  PlaceOrderArgs,
  PlaceOrderFormValues
} from 'app/exchange/market/types/form'
import { transformPlaceOrderFormValuesToArgs } from 'app/exchange/market/utils'

export interface PlaceOrderFormProps {
  onSubmit: (bank: PlaceOrderArgs) => Promise<any>
}

export const PlaceOrderForm: React.FC<PlaceOrderFormProps> = ({ onSubmit }) => {
  const classes = useStyles()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const handleSubmit = async (values: PlaceOrderFormValues) => {
    await onSubmit(transformPlaceOrderFormValuesToArgs(values))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid
        xs={12}
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
        <PlaceOrderFields />
        <Grid item className={classes.buttonWrapper}>
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
    </Form>
  )
}
