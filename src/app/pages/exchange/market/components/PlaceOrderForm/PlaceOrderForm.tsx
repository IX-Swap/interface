import * as yup from 'yup'
import React, { useState } from 'react'
import { Grid, Tab, Tabs } from '@material-ui/core'
import { Submit } from 'components/form/Submit'
import { LabelledValue } from 'components/LabelledValue'
import { useStyles } from 'app/pages/exchange/market/components/PlaceOrderForm/PlaceOrderForm.style'
import { formatMoney } from 'helpers/numbers'
import { PlaceOrderFields } from 'app/pages/exchange/market/components/PlaceOrderFields/PlaceOrderFields'
import { Form } from 'components/form/Form'
import {
  PlaceOrderArgs,
  PlaceOrderFormValues
} from 'app/pages/exchange/market/types/form'
import { transformPlaceOrderFormValuesToArgs } from 'app/pages/exchange/market/utils'
import { TabPanel } from 'components/TabPanel'

export interface PlaceOrderFormProps {
  currencyLabel: string
  tokenLabel: string
  currencyBalance: number
  tokenBalance: number
  onSubmit: (bank: PlaceOrderArgs) => Promise<any>
}

export const PlaceOrderForm: React.FC<PlaceOrderFormProps> = ({
  currencyLabel,
  tokenLabel,
  currencyBalance,
  tokenBalance,
  onSubmit
}) => {
  const classes = useStyles()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const handleSubmit = async (values: PlaceOrderFormValues) => {
    await onSubmit(
      transformPlaceOrderFormValuesToArgs(
        values,
        selectedIdx === 0 ? 'ASK' : 'BID'
      )
    )
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape({
        amount: yup
          .number()
          .when(
            ['total', 'price'],
            (total: number, price: number, schema: yup.NumberSchema) =>
              total > currencyBalance
                ? schema.max(currencyBalance / price, 'Insufficient balance')
                : schema
          )
          .required(),
        price: yup
          .number()
          .when('total', (total: number, schema: yup.NumberSchema) =>
            total > currencyBalance
              ? schema.max(0, 'Insufficient balance')
              : schema
          )
          .required(),
        total: yup.number().required()
      })}
    >
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
            <LabelledValue
              value={formatMoney(15000, currencyLabel)}
              label='Balance:'
            />
          </Grid>

          <Grid item>
            <LabelledValue value={formatMoney(300, tokenLabel)} label='' />
          </Grid>
        </Grid>
        <TabPanel index={0} value={selectedIdx} withoutSpacing={true}>
          <PlaceOrderFields
            currencyLabel={currencyLabel}
            tokenLabel={tokenLabel}
            currencyBalance={currencyBalance}
            tokenBalance={tokenBalance}
            side={'BUY'}
          />
        </TabPanel>
        <TabPanel index={1} value={selectedIdx} withoutSpacing={true}>
          <PlaceOrderFields
            currencyLabel={currencyLabel}
            tokenLabel={tokenLabel}
            currencyBalance={currencyBalance}
            tokenBalance={tokenBalance}
            side={'SELL'}
          />
        </TabPanel>
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
