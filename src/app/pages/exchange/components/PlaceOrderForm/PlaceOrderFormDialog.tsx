import { Box, Button, Grid, Drawer, useTheme } from '@material-ui/core'
import { MarketViewProps } from 'app/pages/exchange/components/Market/MarketGridView'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import React, { useState, useEffect } from 'react'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'

export const PlaceOrderFormDialog = ({
  createOrderStatus,
  isFetching,
  currencyName,
  tokenName,
  currencyBalance,
  tokenBalance,
  submitForm
}: MarketViewProps) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<number | undefined>(undefined)

  const closeDrawer = () => {
    if (!isFetching) {
      setOpen(false)
    }
  }

  const openDrawer = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (active !== undefined) {
      openDrawer()
    }
  }, [active])

  useEffect(() => {
    if (!open) {
      setActive(undefined)
    }
  }, [open])

  const setBuyActive = () => {
    setActive(0)
  }

  const setSellActive = () => {
    setActive(1)
  }

  const handleSubmit = async (args: PlaceOrderArgs) => {
    await submitForm(args)
    closeDrawer()
  }

  return (
    <>
      <Box position='fixed' bottom={0} zIndex={100} width='100%' ml={-1} p={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              color='primary'
              style={{
                backgroundColor: theme.palette.backgrounds.alternative,
                color: '#FFF'
              }}
              onClick={setBuyActive}
            >
              Buy
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              color='primary'
              style={{
                backgroundColor: theme.palette.error.light,
                color: '#FFF'
              }}
              onClick={setSellActive}
            >
              Sell
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Drawer anchor='bottom' open={open} onClose={closeDrawer}>
        <PlaceOrderForm
          createOrderStatus={createOrderStatus}
          isFetching={isFetching}
          currencyLabel={currencyName}
          tokenLabel={tokenName}
          currencyBalance={currencyBalance}
          tokenBalance={
            tokenBalance?.data !== undefined ? tokenBalance.data.amount : 0
          }
          onSubmit={handleSubmit}
          defaultActiveTab={active}
        />
      </Drawer>
    </>
  )
}
