import { Grid, Tab, Tabs } from '@mui/material'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { PlaceOrderFields } from 'app/pages/invest/components/PlaceOrderFields/PlaceOrderFields'
import { useStyles } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderForm.styles'
import {
  PlaceOrderArgs,
  PlaceOrderFormValues
} from 'app/pages/invest/types/form'
import { transformPlaceOrderFormValuesToArgs } from 'app/pages/invest/utils/order'
import { Form } from 'components/form/Form'
import { LabelledValue } from 'components/LabelledValue'
import { TabPanel } from 'components/TabPanel'
import { formatMoney, formatTokenBalance } from 'helpers/numbers'
import { isEmptyString } from 'helpers/strings'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { OrderSide } from 'types/order'
import { PlaceOrderFormSubmitButton } from './PlaceOrderFormSubmitButton'

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
  isDisabled?: boolean
  suffix?: ({ tab }: { tab: number }) => React.ReactNode
}

export const PlaceOrderForm: React.FC<PlaceOrderFormProps> = ({
  createOrderStatus = '',
  currencyLabel,
  tokenLabel,
  currencyBalance,
  tokenBalance,
  suffix,
  isFetching = false,
  isDisabled = false,
  onSubmit,
  defaultActiveTab = 0
}) => {
  const tabs = ['BUY', 'SELL']
  const [activeTabNameIdx, setActiveTabNameIdx] = useState(defaultActiveTab)
  const classes = useStyles(activeTabNameIdx)
  const balance = activeTabNameIdx === 0 ? currencyBalance : tokenBalance
  const totalCurrencyLabel = currencyLabel
  const { pairId } = useParams<{ pairId: string }>()
  const handleSubmit = async (values: PlaceOrderFormValues) => {
    if (isEmptyString(pairId)) {
      return
    }

    await onSubmit(
      transformPlaceOrderFormValuesToArgs(
        values,
        activeTabNameIdx === 0 ? OrderSide.BID : OrderSide.ASK,
        pairId
      )
    )
  }

  return (
    <Form onSubmit={handleSubmit} resetAfterSubmit>
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
              value={formatTokenBalance(tokenBalance, tokenLabel)}
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
        <TwoFADialogWrapper>
          <PlaceOrderFormSubmitButton
            createOrderStatus={createOrderStatus}
            isFetching={isFetching}
            isDisabled={isDisabled}
            balance={balance}
            activeTabNameIdx={activeTabNameIdx}
          />
        </TwoFADialogWrapper>
        {suffix?.({ tab: activeTabNameIdx })}
      </Grid>
    </Form>
  )
}
