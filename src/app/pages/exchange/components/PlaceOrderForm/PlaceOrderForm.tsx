import { Grid, Tab, Tabs } from '@material-ui/core'
import { PlaceOrderFields } from 'app/pages/exchange/components/PlaceOrderFields/PlaceOrderFields'
import { useStyles } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm.styles'
import {
  PlaceOrderArgs,
  PlaceOrderFormValues
} from 'app/pages/exchange/types/form'
import { transformPlaceOrderFormValuesToArgs } from 'app/pages/exchange/utils/order'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { LabelledValue } from 'components/LabelledValue'
import { TabPanel } from 'components/TabPanel'
import { formatMoney } from 'helpers/numbers'
import { isEmptyString } from 'helpers/strings'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export type ActiveTabName = 'BUY' | 'SELL'

export interface PlaceOrderFormProps {
  createOrderStatus?: string
  tokenLabel: string
  tokenBalance: number
  currencyLabel: string
  currencyBalance: number
  isFetching?: boolean
  onSubmit: (bank: PlaceOrderArgs) => Promise<any>
  defaultActiveTab?: number
}

export const PlaceOrderForm: React.FC<PlaceOrderFormProps> = ({
  createOrderStatus = '',
  currencyLabel,
  tokenLabel,
  currencyBalance,
  tokenBalance,
  isFetching = false,
  onSubmit,
  defaultActiveTab = 0
}) => {
  const tabs = ['BUY', 'SELL']
  const [activeTabNameIdx, setActiveTabNameIdx] = useState(defaultActiveTab)
  const classes = useStyles(activeTabNameIdx)
  const balance = activeTabNameIdx === 0 ? currencyBalance : tokenBalance
  const disabled = isFetching || balance === 0
  const totalCurrencyLabel = currencyLabel
  const { pairId } = useParams<{ pairId: string }>()
  const handleSubmit = async (values: PlaceOrderFormValues) => {
    if (isEmptyString(pairId)) return

    await onSubmit(
      transformPlaceOrderFormValuesToArgs(
        values,
        activeTabNameIdx === 0 ? 'BID' : 'ASK',
        pairId
      )
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
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
          justifyContent={'space-between'}
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
            createOrderStatus={createOrderStatus}
            disabled={disabled}
            data-testid='submit'
            size='large'
            variant='contained'
            className={classes.button}
          >
            PLACE ORDER
          </Submit>
        </Grid>
      </Grid>
    </Form>
  )
}
