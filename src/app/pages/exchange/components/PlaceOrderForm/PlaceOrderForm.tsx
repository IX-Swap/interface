import React, { useState } from 'react'
import { Grid, Tab, Tabs } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { formatMoney } from 'helpers/numbers'
import { TabPanel } from 'components/TabPanel'
import { LabelledValue } from 'components/LabelledValue'
import {
  PlaceOrderArgs,
  PlaceOrderFormValues
} from 'app/pages/exchange/types/form'
import { PlaceOrderFields } from 'app/pages/exchange/components/PlaceOrderFields/PlaceOrderFields'
import { useStyles } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm.style'
import { Submit } from 'components/form/Submit'
import { transformPlaceOrderFormValuesToArgs } from 'app/pages/exchange/utils/order'
import { useParams } from 'react-router'

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
  const { pairId } = useParams<{ pairId: string }>()
  const handleSubmit = async (values: PlaceOrderFormValues) => {
    await onSubmit(
      transformPlaceOrderFormValuesToArgs(
        values,
        activeTabNameIdx === 0 ? 'ASK' : 'BID',
        pairId
      )
    )
  }

  // TODO Use for get token balance
  // const { data } = useBalance(pairId)

  return (
    <Form
      onSubmit={handleSubmit}
      // TODO Uncomment after testing
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
              value={formatMoney(currencyBalance, currencyLabel)}
              label='Balance:'
            />
          </Grid>

          <Grid item>
            <LabelledValue
              value={formatMoney(tokenBalance, tokenLabel)}
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
          <Submit
            data-testid='submit'
            size='large'
            variant='contained'
            className={classes.button}
            disabled={false}
          >
            PLACE ORDER
          </Submit>
        </Grid>
      </Grid>
    </Form>
  )
}
