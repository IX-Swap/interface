import React, { useState } from 'react'
import { Grid, Tab, Tabs } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { formatMoney } from 'helpers/numbers'
import { TabPanel } from 'components/TabPanel'
import { LabelledValue } from 'components/LabelledValue'
import {
  PlaceOrderArgs,
  PlaceOrderFormValues
} from 'app/pages/exchange/market/types/form'
import { transformPlaceOrderFormValuesToArgs } from 'app/pages/exchange/market/utils'
// import { placeOrderFormValidationSchema } from 'app/pages/exchange/market/validation'
import { PlaceOrderFields } from 'app/pages/exchange/market/components/PlaceOrderFields/PlaceOrderFields'
import { useStyles } from 'app/pages/exchange/market/components/PlaceOrderForm/PlaceOrderForm.style'
import { PlaceOrderSubmit } from 'app/pages/exchange/market/components/PlaceOrderSubmit/PlaceOrderSubmit'

export type ActiveTabName = 'BUY' | 'SELL'

export interface PlaceOrderFormProps {
  tokenLabel: string
  tokenBalance: number
  currencyLabel: string
  currencyBalance: number
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
  const tabs = ['BUY', 'SELL']
  const [activeTabNameIdx, setActiveTabNameIdx] = useState(0)
  const balance = activeTabNameIdx === 0 ? currencyBalance : tokenBalance
  const totalCurrencyLabel = activeTabNameIdx === 0 ? currencyLabel : tokenLabel
  const handleSubmit = async (values: PlaceOrderFormValues) => {
    await onSubmit(
      transformPlaceOrderFormValuesToArgs(
        values,
        activeTabNameIdx === 0 ? 'ASK' : 'BID'
      )
    )
  }

  return (
    <Form
      onSubmit={handleSubmit}
      // validationSchema={placeOrderFormValidationSchema(balance)}
    >
      <Grid container direction={'column'} className={classes.container}>
        <Grid item>
          <Tabs
            value={activeTabNameIdx}
            onChange={(_, index) => setActiveTabNameIdx(index)}
            classes={{
              indicator: classes.indicator
            }}
            TabIndicatorProps={{ children: <span /> }}
          >
            {tabs.map(tabName => {
              return (
                <Tab
                  key={tabName}
                  label={tabName}
                  classes={{
                    root: classes.tab
                  }}
                />
              )
            })}
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
              // TODO Remove fake value after complete backend api
              value={formatMoney(15000, currencyLabel)}
              label='Balance:'
            />
          </Grid>

          <Grid item>
            <LabelledValue
              // TODO Remove fake value after complete backend api
              value={formatMoney(300, tokenLabel)}
              label=''
            />
          </Grid>
        </Grid>
        {tabs.map((tabName, index) => {
          return (
            <TabPanel
              key={tabName}
              index={index}
              value={activeTabNameIdx}
              withoutSpacing={true}
            >
              <PlaceOrderFields
                balance={balance}
                totalCurrencyLabel={totalCurrencyLabel}
              />
            </TabPanel>
          )
        })}
        <Grid item className={classes.buttonWrapper}>
          <PlaceOrderSubmit />
        </Grid>
      </Grid>
    </Form>
  )
}
