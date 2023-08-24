import { Grid, Tab, Tabs, Typography, Box } from '@mui/material'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { PlaceOrderFields } from 'app/pages/invest/components/PlaceOrderFields/PlaceOrderFields'
import { useStyles } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderForm.styles'
import { PlaceOrderFormValues } from 'app/pages/invest/types/form'
import { Form } from 'components/form/Form'
import { LabelledValue } from 'components/LabelledValue'
import { TabPanel } from 'components/TabPanel'
import { formatMoney, formatTokenBalance } from 'helpers/numbers'
import { isEmptyString } from 'helpers/strings'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { OrderSide } from 'types/order'
import { PlaceOrderFormSubmitButton } from './PlaceOrderFormSubmitButton'
import { useAuth } from 'hooks/auth/useAuth'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { ConfirmPlaceOrderDialog } from './ConfirmPlaceOrderDialog'
import { transformPlaceOrderFormValuesToArgs } from '../../utils/order'
export type ActiveTabName = 'BUY' | 'SELL'

export interface PlaceOrderFormProps {
  createOrderStatus?: string
  tokenLabel: string
  tokenBalance: number
  currencyLabel: string
  currencyBalance: number
  isFetching?: boolean
  onSubmit: (bank: any) => Promise<any>
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
  const { user } = useAuth()
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [values, setValues] = useState<PlaceOrderFormValues>()
  const roles = user?.roles?.split(',')
  const isRetailInvestor = roles?.includes('retail') ?? false
  const isCorporateInvestor = user?.accountType === 'CORPORATE'
  const { data: individualData } = useIndividualIdentity()
  const { data: corporateData } = useAllCorporates({})
  const residencies = !isCorporateInvestor
    ? individualData?.taxResidencies
    : corporateData?.list[0]?.taxResidencies
  const isSingaporeResident =
    typeof residencies?.find(x => x.countryOfResidence === 'Singapore') !==
    'undefined'
  const isExchangeEnabled = !(isRetailInvestor && isSingaporeResident)

  const tabs = ['BUY', 'SELL']
  const [activeTabNameIdx, setActiveTabNameIdx] = useState(defaultActiveTab)
  const classes = useStyles(activeTabNameIdx)
  const balance = activeTabNameIdx === 0 ? currencyBalance : tokenBalance
  const totalCurrencyLabel = currencyLabel
  const { pairId } = useParams<{ pairId: string }>()

  const closeDialog = () => {
    setOpenConfirmDialog(false)
  }

  const openDialog = () => {
    setOpenConfirmDialog(true)
  }

  const handleSubmit = async (values: PlaceOrderFormValues) => {
    setValues(values)

    openDialog()
  }
  const handleClick = async () => {
    if (isEmptyString(pairId) || !isExchangeEnabled) {
      return Promise.resolve()
    }

    await Promise.resolve()
    const args = transformPlaceOrderFormValuesToArgs(
      values,
      activeTabNameIdx === 0 ? OrderSide.BID : OrderSide.ASK,
      pairId
    )
    onSubmit(args)
    closeDialog()
  }

  return (
    <>
      <ConfirmPlaceOrderDialog
        activeTabNameIdx={activeTabNameIdx}
        pairId={pairId}
        open={openConfirmDialog}
        close={closeDialog}
        values={values}
        isExchangeEnabled={isExchangeEnabled}
        onSubmit={handleClick}
      />
      <Form onSubmit={handleSubmit} resetAfterSubmit>
        <Grid container direction={'column'} className={classes.container}>
          {!isExchangeEnabled && (
            <Grid item className={classes.overlay}>
              <Box m={'auto'} p={4} textAlign={'center'}>
                <Typography color='#778194' variant='subtitle2'>
                  Exchange Trading Not Available
                </Typography>
                <Typography color='#778194' fontSize={'12px'} mt={1}>
                  This service is not available for retail investors with tax
                  residence in Singapore.
                </Typography>
              </Box>
            </Grid>
          )}

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
                  activeTab={activeTabNameIdx}
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
    </>
  )
}
